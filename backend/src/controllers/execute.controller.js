import { db } from "../libs/db.js";
import {
  pollBatchResults,
  submitBatch,
  getLanguageName,
} from "../libs/judge0.libs.js";

export const executeCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  const userId = req.user.id;

  try {
    // validate the test cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: "Invalid test cases" });
    }

    // Prepare each test case for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // Submit the code to Judge0 and get the results
    const sumbitResponse = await submitBatch(submissions);

    // Poll for the results
    const results = await pollBatchResults(sumbitResponse.map((r) => r.token));

    console.log("results-------------", results);

    // Check if the results match the expected outputs
    let allPassed = true;

    const detailedResults = results.map((result, index) => {
      const standOut = result.stdout?.trim();
      const expectedOutput = expected_outputs[index]?.trim();
      const passed = standOut === expectedOutput;

      if (!passed) allPassed = false;

      return {
        testNumber: index + 1,
        passed,
        stout: standOut,
        expected: expectedOutput,
        sterror: result.stderr || null,
        complieout: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory.toString()} KB` : undefined,
        time: result.time ? `${result.time.toString()} s` : undefined,
      };
    });

    console.log("userId -----------------", userId);

    // update submission
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stout)),
        stderr: detailedResults.some((r) => r.sterror)
          ? JSON.stringify(detailedResults.map((r) => r.sterror))
          : null,
        compileOutput: detailedResults.some((r) => r.complieout)
          ? JSON.stringify(detailedResults.map((r) => r.complieout))
          : null,
        status: allPassed ? "Accepted" : "Rejected",
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });

    //If all passed is true, marked the problem as solved to existing user
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    // create test case results
    const testCaseResult = detailedResults.map((r) => ({
      submissionId: submission.id,
      testCaseNumber: r.testNumber,
      passed: r.passed,
      stdout: r.stout,
      expected: r.expected,
      stderr: r.sterror,
      compileOutput: r.complieout,
      status: r.status,
      memory: r.memory,
      time: r.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResult,
    });

    // fetch submission with test cases
    const submissionWithTestCaseResults = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Code executed successfully",
      submission: submissionWithTestCaseResults,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while executing code" });
  }
};

import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.libs.js";

export const createProblem = async (req, res) => {
  // going to get the all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolutions,
    hints,
    editorial,
  } = req.body;

  // Check the user role for confirmation
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "You cannot create a problem" });
  }

  // loop through each reference solution for different lanugage
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        // console.log("Result-----", result);
        console.log(
          `Testcase ${
            i + 1
          } and Language ${language} ----- result ${JSON.stringify(
            result.status.description
          )}`
        );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testCases,
        codeSnippets,
        editorial,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();

    if (!problems) {
      return res.status(404).json({ error: "No problems found" });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Fetched all the problems", problems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error While Fetching Problems" });
  }
};

export const getProblembyId = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Fetched problem", problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error While Fetching Problem" });
  }
};

export const updateProblem = async (req, res) => {
  // going to get the all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolutions,
    hints,
    editorial,
  } = req.body;

  // Check the user role for confirmation
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "You cannot update the problem" });
  }

  // going to get the id from the request params
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Problem id is incorrect or missing" });
  }

  // check if the problem exists
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // checking whether the user is updating the reference solutions which require judge0 to be re-run

    let runJudge0Code = false;

    const reqReferenceSolutions = referenceSolutions;
    const dbReferenceSolutions = problem.referenceSolutions;

    for (const [language, solutionCode] of Object.entries(
      reqReferenceSolutions
    )) {
      if (solutionCode !== dbReferenceSolutions[language]) {
        console.log(
          "Language code and reference solution is not matching with database"
        );
        runJudge0Code = true;
        break;
      } else {
        console.log(
          "Language code and reference solution is matching with database"
        );
        runJudge0Code = false;
        break;
      }
    }

    if (runJudge0Code) {
      for (const [language, solutionCode] of Object.entries(
        referenceSolutions
      )) {
        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
          return res
            .status(400)
            .json({ error: `Language ${language} is not supported` });
        }

        const submissions = testCases.map(({ input, output }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);

        const tokens = submissionResults.map((res) => res.token);

        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          // console.log("Result-----", result);
          console.log(
            `Testcase ${
              i + 1
            } and Language ${language} ----- result ${JSON.stringify(
              result.status.description
            )}`
          );
          if (result.status.id !== 3) {
            return res.status(400).json({
              error: `Testcase ${i + 1} failed for language ${language}`,
            });
          }
        }
      }
    }

    // updating the problem in database
    const updatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
        hints,
        editorial,
      },
    });

    return res.status(200).json({
      sucess: true,
      message: "Problem Updated Successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error While Updating Problem",
    });
  }
};

export const deleteProblem = async (req, res) => {
  // going to get the id from the request params
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Problem id is incorrect or missing" });
  }

  // Check the user role for confirmation
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "You cannot delete the problem" });
  }

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    await db.problem.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      sucess: true,
      message: "Problem Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error While Deleting Problem" });
  }
};

export const getAllSolvedProblemsByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(200).json({
      sucess: true,
      message: "Fetched all the problems solved by currently logged in user",
      problems,
    });
  } catch (error) {
    console.log("error while fetching problems", error);
    res.status(500).json({ error: "Error While Fetching Problems" });
  }
};

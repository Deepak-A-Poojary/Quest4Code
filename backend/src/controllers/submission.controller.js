import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      sucess: true,
      message: "Fetched all the submissions",
      submissions,
    });
  } catch (error) {
    console.log("error while fetching submissions", error);
    res.status(500).json({ error: "Error While Fetching Submissions" });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.params;

    console.log(problemId);

    const submissions = await db.submission.findMany({
      where: {
        userId,
        problemId,
      },
    });

    res.status(200).json({
      sucess: true,
      message: `Fetched all the submission by id:${problemId}`,
      submissions,
    });
  } catch (error) {
    console.log("error while fetching submissions", error);
    res.status(500).json({ error: "Error While Fetching Submissions" });
  }
};

export const getAllTheSubmissionsCount = async (req, res) => {
  try {
    const problemId = req.params.id;

    const submissionsCount = await db.submission.count({
      where: {
        problemId,
      },
    });

    res.status(200).json({
      sucess: true,
      message: "Fetched all the submissions",
      submissionsCount,
    });
  } catch (error) {
    console.log("error while fetching submissions count", error);
    res.status(500).json({ error: "Error While Fetching Submissions" });
  }
};

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSubmissions,
  getSubmissionsForProblem,
  getAllTheSubmissionsCount,
} from "../controllers/submission.controller.js";

const submissionRoute = express.Router();

submissionRoute.get("/get-all-submissions", authMiddleware, getAllSubmissions);
submissionRoute.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);
submissionRoute.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getAllTheSubmissionsCount
);

export default submissionRoute;

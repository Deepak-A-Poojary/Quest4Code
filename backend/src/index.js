import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/execute.routes.js";
import submissionRoute from "./routes/submission.route.js";
import playlistRoutes from "./routes/playlist.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 6000;

const allowedOrigins = ["http://localhost:5173", "http://192.168.31.206:5173", "https://quest4code.onrender.com"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins, // Replace with your frontend URL
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to questCode");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1/playlist", playlistRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running ${port}`);
});

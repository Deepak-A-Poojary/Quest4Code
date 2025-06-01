import express from "express";
import {
  register,
  login,
  logout,
  check,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

// Register
authRoutes.post("/register", register);

// Login
authRoutes.post("/login", login);

// logout
authRoutes.post("/logout", authMiddleware, logout);

// Checking
authRoutes.get("/check", authMiddleware, check);

export default authRoutes;

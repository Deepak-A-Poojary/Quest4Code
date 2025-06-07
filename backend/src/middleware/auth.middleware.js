import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - Token not found",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token on decoded",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized - User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied - Admins only",
      });
    }
    next();
  } catch (error) {
    console.log("error while checking admin", error);
    res.status(500).json({
      error: "Error whiling checking admin",
    });
  }
};

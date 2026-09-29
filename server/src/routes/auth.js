import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, login } from "../controler/auth.controller.js";
import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // maxim 5 încercări
  message: {
    message: "Too many registration attempts. Try again later.",
  },
});
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

// Demo user store. Replace with MongoDB/PostgreSQL in production.
const users = [];

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });

router.post("/register", registerLimiter, register);

router.post("/login", login);

router.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });
  try {
    const user = jwt.verify(auth.slice(7), JWT_SECRET);
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;

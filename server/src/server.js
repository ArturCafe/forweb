import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import projectsRouter from "./routes/projects.js";
import postsRouter from "./routes/posts.js";
import contactRouter from "./routes/contact.js";
import cameraRouter from "./routes/camera.js";
import authRouter from "./routes/auth.js";

import connectDB from "./data/connectDb.js"; // 1. Импортируем подключение

dotenv.config();

// 2. Подключаемся к MongoDB
connectDB();

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Artcore Express API is running" });
});

app.use("/videos", express.static(process.env.DEST_DIR));

app.use("/api/camera/", cameraRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);

app.use((req, res) =>
  res
    .status(404)
    .json({ message: `Route ${req.method} ${req.originalUrl} not found` }),
);

app.listen(port, () => console.log(`API running on http://localhost:${port}`));

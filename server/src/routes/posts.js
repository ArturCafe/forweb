import { Router } from "express";
import { posts } from "../data/content.js";

const router = Router();

router.get("/", (_req, res) => res.json(posts));
router.get("/:id", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

export default router;

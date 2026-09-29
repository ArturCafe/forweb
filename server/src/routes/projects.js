import { Router } from "express";
import { projects } from "../data/content.js";

const router = Router();

router.get("/", (_req, res) => res.json(projects));
router.get("/:id", (req, res) => {
  const project = projects.find((item) => item.id === Number(req.params.id));
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

export default router;

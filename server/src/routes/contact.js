import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { name, email, project } = req.body;

  if (!name || !email || !project) {
    return res.status(400).json({ message: "Name, email and project are required" });
  }

  console.log("New contact message:", { name, email, project, createdAt: new Date().toISOString() });
  res.status(201).json({ message: "Message sent successfully" });
});

export default router;

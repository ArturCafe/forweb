import { Router } from "express";
import {
  getFolders,
  getFoldersposts,
  getVeb,
} from "../controler/webcam.controller.js";

const router = Router();

router.get("/get", getVeb);
//camera/getfolder
router.get("/getfolder", getFolders);

router.get("/getfolder/:id", getFoldersposts);

export default router;

import express from "express";
import {
  getVideo,
  getVideoById,
  getVideoBycourseId,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/Video.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/video", getVideo);
router.get("/video/course/:id", getVideoBycourseId);
router.get("/video/:id", getVideoById);
router.post("/video", verifyUser, adminOnly, createVideo);
router.patch("/video/:id", verifyUser, adminOnly, updateVideo);
router.delete("/video/:id", verifyUser, adminOnly, deleteVideo);

export default router;

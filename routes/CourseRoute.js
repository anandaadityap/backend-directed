import express from "express";
import {
  getCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/Course.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/course", getCourse);
router.get("/course/:id", getCourseById);
router.post("/course", verifyUser, adminOnly, createCourse);
router.patch("/course/:id", verifyUser, adminOnly, updateCourse);
router.delete("/course/:id", verifyUser, adminOnly, deleteCourse);

export default router;

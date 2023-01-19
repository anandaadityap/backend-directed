import express from "express";
import {
  getJob,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobByUserId,
} from "../controllers/Jobseeker.js";
import { verifyUser, adminOnly, companyOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/jobseeker", getJob);
router.get("/jobseeker/:id", getJobById);
router.get("/jobseeker/user/:id", verifyUser, getJobByUserId);
router.post("/jobseeker", verifyUser, companyOnly, createJob);
router.patch("/jobseeker/:id", verifyUser, companyOnly, updateJob);
router.delete("/jobseeker/:id", verifyUser, companyOnly, deleteJob);

export default router;

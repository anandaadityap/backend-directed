import express from "express";
import {
  getKandidat,
  getKandidatById,
  getKandidatByJobseekerId,
  createKandidat,
} from "../controllers/Kandidat.js";
import { verifyUser, adminOnly, companyOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/kandidat", getKandidat);
router.get("/kandidat/:id", getKandidatById);
router.get(
  "/kandidat/job/:id",
  verifyUser,
  companyOnly,
  getKandidatByJobseekerId
);
router.post("/kandidat", verifyUser, createKandidat);
// router.patch("/jobseeker/:id", verifyUser, companyOnly, updateJob);
// router.delete("/jobseeker/:id", verifyUser, companyOnly, deleteJob);

export default router;

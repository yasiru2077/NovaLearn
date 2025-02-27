// routes/submissions.js

import express from "express";
import {
  addSubmission,
  getSubmissions,
  getSubmissionById,
  gradeSubmission,
  updateSubmission,
  deleteSubmission,
} from "../controllers/submissions.js";

const router = express.Router();

// CRUD Routes
router.post("/add", addSubmission); // Add submission
router.get("/all", getSubmissions); // Get all submissions with optional filters
router.get("/:id", getSubmissionById); // Get a single submission by ID
router.put("/grade/:id", gradeSubmission); // Grade a submission
router.put("/update/:id", updateSubmission); // Update submission file
router.delete("/delete/:id", deleteSubmission); // Delete submission

export default router;

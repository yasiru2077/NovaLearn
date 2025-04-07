import express from "express";
import {
  Enroll,
  deleteEnrollment,
  getEnrollment,
  updateEnrollment,
} from "../controllers/enrollment.js";
import { verifyToken, verifyAdmin } from "../middleware.js";

const router = express.Router();

// Protect all routes with verifyToken and verifyAdmin
router.post("/add", verifyToken, verifyAdmin, Enroll); // Add a user
router.get("/all", verifyToken, getEnrollment); // Get all users
router.put("/update/:id", verifyToken, verifyAdmin, updateEnrollment); // Update user details
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteEnrollment); // Delete a user

export default router;

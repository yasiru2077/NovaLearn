import express from "express";
import { addAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment } from "../controllers/assignments.js";

const router = express.Router();

// CRUD Routes
router.post("/add", addAssignment); // Add assignment
router.get("/all", getAssignments); // Get all assignments
router.get("/:id", getAssignmentById); // Get a single assignment by ID
router.put("/update/:id", updateAssignment); // Update assignment
router.delete("/delete/:id", deleteAssignment); // Delete assignment

export default router;

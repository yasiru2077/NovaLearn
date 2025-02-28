import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementsController.js";

const router = express.Router();

// Define routes and attach controller functions
router.post("/", createAnnouncement); // Create an announcement
router.get("/", getAnnouncements); // Get all announcements for a course
router.put("/:id", updateAnnouncement); // Update an announcement
router.delete("/:id", deleteAnnouncement); // Delete an announcement

export default router;

import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizzes.js";

const router = express.Router();

// Define routes and attach controller functions
router.post("/", createQuiz); // Create a quiz with questions
router.get("/", getQuizzes); // Get all quizzes for a course
router.get("/:id", getQuizById); // Get a quiz with questions
router.put("/:id", updateQuiz); // Update a quiz title
router.delete("/:id", deleteQuiz); // Delete a quiz

export default router;

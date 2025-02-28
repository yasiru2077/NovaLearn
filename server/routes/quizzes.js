import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
  addQuestion,
  getQuestions,
} from "../controllers/quizzes.js";

const router = express.Router();

// Quiz routes
router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id", deleteQuiz);

// Quiz Questions routes
router.post("/:quizId/questions", addQuestion);
router.get("/:quizId/questions", getQuestions);

export default router;

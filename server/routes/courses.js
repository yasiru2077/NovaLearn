import express from "express";
import {
  addCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controllers/courses.js";
import { verifyToken, verifyAdmin } from "../middleware.js";

const router = express.Router();

// Protect all routes with verifyToken and verifyAdmin
router.post("/add", verifyToken, verifyAdmin, addCourse);
router.get("/all", verifyToken, getCourse);
router.put("/update/:id", verifyToken, verifyAdmin, updateCourse);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteCourse);

export default router;

import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user-management.js";
import { verifyToken, verifyAdmin } from "../middleware.js";

const router = express.Router();

// Protect all routes with verifyToken and verifyAdmin
router.post("/add", verifyToken, verifyAdmin, addUser); // Add a user
router.get("/all", verifyToken, verifyAdmin, getUsers); // Get all users
router.put("/update/:id", verifyToken, verifyAdmin, updateUser); // Update user details
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteUser); // Delete a user

export default router;

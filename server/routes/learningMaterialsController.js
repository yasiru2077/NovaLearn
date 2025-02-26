import express from "express";
import {
  addMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial,
  upload,
} from "../controllers/learningMaterialsController.js";

const router = express.Router();

// CRUD Routes
router.post("/add", upload.single("file"), addMaterial); // Add material with file
router.get("/all", getMaterials); // Get all materials
router.put("/update/:id", upload.single("file"), updateMaterial); // Update material (optional file upload)
router.delete("/delete/:id", deleteMaterial); // Delete material

export default router;

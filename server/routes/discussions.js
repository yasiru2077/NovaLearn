import express from "express";
import {
  addDiscussion,
  seeDiscussion,
  editDiscussion,
  deleteDiscussion,
} from "../controllers/discussions.js";

const router = express.Router();

router.post("/add", addDiscussion);
router.get("/all", seeDiscussion);
router.put("/update/:id", editDiscussion);
router.delete("/delete/:id", deleteDiscussion);

export default router;

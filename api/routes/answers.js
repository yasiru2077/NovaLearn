const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const AnswerSheet = require("../models/AnswerSheet");

// Create a new answer sheet
router.post("/", async (req, res) => {
  try {
    const { title, score, username } = req.body;

    const newAnswerSheet = new AnswerSheet({ title, score, username });

    const savedAnswerSheet = await newAnswerSheet.save();

    res.status(201).json(savedAnswerSheet);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Get answers by title
router.get("/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const answers = await AnswerSheet.find({ title });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


router.get("/", async (req, res) => {
  try {
    const title = req.params.title;
    const answers = await AnswerSheet.find();
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
module.exports = router;

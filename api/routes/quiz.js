const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz"); // Import your Quiz model

// Create a new quiz
router.post("/", async (req, res) => {
    const newQuiz = new Quiz(req.body);
    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all quizzes
router.get("/", async (req, res) => {
    
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:title", async (req, res) => {
    
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Get a single quiz by ID
router.get("/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a quiz by ID
router.put("/:id", async (req, res) => {
    
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                questions: req.body.questions
            },
            { new: true }
        );
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a quiz by ID
router.delete("/:id", async (req, res) => {
    try {
        await Quiz.findByIdAndRemove(req.params.id);
        res.status(200).json("Quiz deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

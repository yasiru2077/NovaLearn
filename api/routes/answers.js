const router = require("express").Router();
const AnswerSheet = require("../models/AnswerSheet");


router.post("/", async (req, res) => {
    try {
      const newAnswerSheet = new AnswerSheet(req.body);
      const savedAnswerSheet = await newAnswerSheet.save();
      res.status(201).json(savedAnswerSheet);
    } catch (error) {
        console.error(error);
      res.status(500).json(error);
    }
  });


module.exports = router; 
  
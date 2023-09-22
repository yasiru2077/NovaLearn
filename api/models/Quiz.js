const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOptionIndex: {
        type: Number,
        required: true
    },
    answerOptionIndex: {
        type: Number,
      
     
    },
});

const quizSchema = new mongoose.Schema({
    

    teaching_subject:{
        type: String,
        required:true 
    },
    

    title: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

const mongoose = require("mongoose");

const AnswerSheetSchema = new mongoose.Schema(
    {
        answerOptionIndex: {
            type: Number,
            
         
        },
       
        
    },
    { timestamps: true }
  );
  

module.exports = mongoose.model("AnswerSheet", AnswerSheetSchema);
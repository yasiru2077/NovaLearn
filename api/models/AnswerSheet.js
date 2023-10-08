const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    
    },

    title: {
      type: String,
      required: true
    },
    score:{
      type: Number,
        required: true
    }

    // Other fields for the answer sheet if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnswerSheet", AnswerSchema);

const mongoose = require("mongoose");

const TeachersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        required: true,
    },
    teaching_subject:{
        type: String,
        required: true,
    },
    teacher_class:{
        type: String,
        
    }
    ,
    profilePic: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Teachers", TeachersSchema);
const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
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
    subject1:{
        type: String,
        required: true,
    },
    subject2:{
        type: String,
        required: true,
    },
    subject3:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    StId:{
        type: String,
        required: true,
    },

    st_class:{
        type: String,
        required: true,
    }
    ,
    grade:{
        type: String,
        required: true,
    }
    ,
    profilePic: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", StudentsSchema);
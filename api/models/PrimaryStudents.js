const mongoose = require("mongoose");

const PrimaryStudentsSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("PrimaryStudents", PrimaryStudentsSchema);
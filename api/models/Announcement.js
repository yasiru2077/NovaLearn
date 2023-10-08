const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
    {
     teaching_subject:{
        type: String,
        required: true,
     },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      
    },
    { timestamps: true }
  );
  

module.exports = mongoose.model("Announcement", AnnouncementSchema);
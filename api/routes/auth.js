const router = require("express").Router();
const User = require("../models/User");
const Teacher = require("../models/Teachers"); // Renamed User1 to Teacher
const Student = require("../models/Students");
const PrimaryStudents = require("../models/PrimaryStudents");                                       // Renamed User2 to Student
const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const teacher = await Teacher.findOne({ username: req.body.username }); // Changed User1 to Teacher
    const student = await Student.findOne({ username: req.body.username }); // Changed User2 to Student
    const primarystudents = await PrimaryStudents.findOne({ username: req.body.username }); 
    if (!user && !teacher && !student && !primarystudents) { // Check if none of the user types are found
      return res.status(400).json("Wrong credentials!");
    }

    let validated = false;
    let foundUser;

    if (user) {
      validated = await bcrypt.compare(req.body.password, user.password);
      foundUser = user;
    } else if (teacher) {
      validated = await bcrypt.compare(req.body.password, teacher.password);
      foundUser = teacher;
    } else if (student) {
      validated = await bcrypt.compare(req.body.password, student.password);
      foundUser = student;
    }else if (primarystudents){
      validated = await bcrypt.compare(req.body.password, primarystudents.password);
      foundUser=primarystudents;
    }

    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = foundUser._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

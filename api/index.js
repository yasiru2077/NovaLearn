const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const teachersRoute = require("./routes/teachers");
const studentsRoute = require("./routes/students");
const primarystudentsRoute = require("./routes/primarystudents");
const QuizRoute = require("./routes/quiz");
const EventsRoute = require("./routes/events");
const AnswerSheetRoute = require("./routes/answers");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "Screenshot (11).png");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/students", studentsRoute);
app.use("/api/students", studentsRoute);
app.use("/api/primarystudents", primarystudentsRoute);
app.use("/api/quiz", QuizRoute);
app.use("/api/events",EventsRoute);
app.use("/api/answers",AnswerSheetRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
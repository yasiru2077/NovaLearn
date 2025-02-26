import express from "express";
const app = express();

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/user-management.js";
import courseRoutes from "./routes/courses.js";
import enrollmentRoutes from "./routes/enrollment.js";
import learningMaterialsRoutes from "./routes/learningMaterialsController.js";
import assignmentsRoutes from "./routes/assignments.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user-management", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/materials", learningMaterialsRoutes);
app.use("/api/assignments", assignmentsRoutes);

app.listen(port, () => {
  console.log(`API working on ${port}`);
});

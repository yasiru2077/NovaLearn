import express from "express";
import { login, register, logout, verify  } from "../controllers/auth.js";
import { verifyToken } from "../middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/verify", verifyToken, verify);

export default router;

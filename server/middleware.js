import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "key", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.userId = userInfo.id;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const q = "select role from lmsAuth where id = ?";

  db.query(q, [req.userId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    if (data[0].role !== "admin") {
      return res.status(403).json("Access denied! Admins only.");
    }
    next();
  });
};

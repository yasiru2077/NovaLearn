import express from "express";
import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import { decrypt } from "dotenv";

export const addUser = (req, res) => {
  const q = "select * from lmsAuth where username = ? or email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      return res.status(409).json("User already exits!");
    }

    const salt = decrypt.hashSync(req.body.password, salt);

    const q = "insert into lmsAuth (username,email,role,password) values(?)";

    const values = [
      req.body.username,
      req.body.email,
      req.body.role,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("User has been created.");
    });
  });
};


export const getUsers = (req,res) ={
    const q = "select id,username,email,role,created_at from lmsAuth"
}
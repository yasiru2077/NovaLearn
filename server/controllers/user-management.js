import { db } from "../connect.js";
import bcrypt from "bcryptjs";

// Add a new user (Student or Teacher)
export const addUser = (req, res) => {
  const q = "SELECT * FROM lmsAuth WHERE username = ? OR email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO lmsAuth (username, email, role, password) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.role, hashedPassword];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

// Get all users (Students & Teachers)
export const getUsers = (req, res) => {
  const q = "SELECT id, username, email, role, created_at FROM lmsAuth"; // Exclude passwords

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Update User Details
export const updateUser = (req, res) => {
  const { username, email, role } = req.body;
  const q = "UPDATE lmsAuth SET username = ?, email = ?, role = ? WHERE id = ?";

  db.query(q, [username, email, role, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User updated successfully.");
  });
};

// Delete a User
export const deleteUser = (req, res) => {
  const q = "DELETE FROM lmsAuth WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User deleted successfully.");
  });
};

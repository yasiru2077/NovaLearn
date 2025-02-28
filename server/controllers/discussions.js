import { db } from "../connect.js";
import express from "express";


// ➤ CREATE a new message
export const addDiscussion = (req, res) => {
  const { course_id, user_id, message } = req.body;

  if (!course_id || !user_id || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query =
    "INSERT INTO discussions (course_id, user_id, message) VALUES (?, ?, ?)";

  db.query(query, [course_id, user_id, message], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(201).json({
      message: "Message sent successfully!",
      discussionId: result.insertId,
    });
  });
};

// ➤ READ all messages for a course
export const seeDiscussion = (req, res) => {
  const { course_id } = req.query;

  if (!course_id)
    return res.status(400).json({ message: "Course ID is required." });

  const query = `
        SELECT d.*, u.username FROM discussions d 
        JOIN lmsAuth u ON d.user_id = u.id 
        WHERE d.course_id = ? 
        ORDER BY d.posted_at DESC`;

  db.query(query, [course_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(200).json(results);
  });
};

// ➤ UPDATE a message (Only the author can update)
export const editDiscussion = (req, res) => {
  const { id } = req.params;
  const { user_id, message } = req.body;

  if (!message || !user_id)
    return res
      .status(400)
      .json({ message: "User ID and message are required." });

  const updateQuery =
    "UPDATE discussions SET message = ? WHERE id = ? AND user_id = ?";

  db.query(updateQuery, [message, id, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res
        .status(403)
        .json({ message: "Unauthorized or message not found." });

    res.status(200).json({ message: "Message updated successfully!" });
  });
};

// ➤ DELETE a message (Only the author can delete)
export const deleteDiscussion = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!user_id)
    return res.status(400).json({ message: "User ID is required." });

  const deleteQuery = "DELETE FROM discussions WHERE id = ? AND user_id = ?";

  db.query(deleteQuery, [id, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res
        .status(403)
        .json({ message: "Unauthorized or message not found." });

    res.status(200).json({ message: "Message deleted successfully!" });
  });
};



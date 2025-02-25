import { db } from "../connect.js";
import bcrypt from "bcryptjs";

// Add a new user (Student or Teacher)
export const addCourse = (req, res) => {
  const q = "SELECT * FROM courses WHERE title = ?";

  db.query(q, [req.body.title], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("course already exists!");

    const { title, description, lecturer_id } = req.body;
    const q =
      "INSERT INTO courses (title, description, lecturer_id) VALUES (?)";
    const values = [title, description, lecturer_id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Course has been created.");
    });
  });
};

// Get all users (Students & Teachers)
export const getCourse = (req, res) => {
  // const q = `
  //   SELECT courses.id, courses.title, courses.description,
  //          lmsAuth.username AS lecturer
  //   FROM courses
  //   LEFT JOIN lmsAuth ON courses.lecturer_id = lmsAuth.id
  // `;

  const q =
    "select courses.id, courses.title,courses.description,courses.lecturer_id from courses";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Update User Details
export const updateCourse = (req, res) => {
  const { title, description } = req.body;
  // const q =
  //   "UPDATE courses SET title = ?, description = ? WHERE id = ? AND lecturer_id = ?";

  const q =
    "UPDATE courses SET title = ?, description = ?, lecturer_id = ? WHERE id = ? ";

  db.query(q, [title, description, req.params.id, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(403).json("Not authorized to update this course!");
    return res.status(200).json("Course updated successfully.");
  });
};

// Delete a User
export const deleteCourse = (req, res) => {
  // const q = "DELETE FROM courses WHERE id = ? AND lecturer_id = ?";
  const q = "DELETE FROM courses WHERE id = ?";

  db.query(q, [req.params.id, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(403).json("Not authorized to delete this course!");
    return res.status(200).json("Course deleted successfully.");
  });
};

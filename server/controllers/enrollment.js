import { db } from "../connect.js";
import bcrypt from "bcryptjs";

// Enroll a student in a course
export const Enroll = (req, res) => {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res
      .status(400)
      .json({ message: "Student ID and Course ID are required." });
  }

  const query = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
  db.query(query, [student_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Student enrolled successfully",
      enrollmentId: result.insertId,
    });
  });
};

// Get all enrollments
export const getEnrollment = (req, res) => {
  const query = `SELECT enrollments.id,  enrollments.student_id,  enrollments.course_id,  lmsAuth.username AS student, courses.title AS course, enrollments.enrolled_at 
                 FROM enrollments 
                 JOIN lmsAuth ON enrollments.student_id = lmsAuth.id 
                 JOIN courses ON enrollments.course_id = courses.id`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Update enrollment (change course for a student)
export const updateEnrollment = (req, res) => {
  const { id } = req.params;
  const { course_id } = req.body;

  if (!course_id) {
    return res.status(400).json({ message: "Course ID is required." });
  }

  const query = "UPDATE enrollments SET course_id = ? WHERE id = ?";
  db.query(query, [course_id, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Enrollment not found." });
    res.status(200).json({ message: "Enrollment updated successfully." });
  });
};

// Delete an enrollment
export const deleteEnrollment = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM enrollments WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Enrollment not found." });
    res.status(200).json({ message: "Enrollment deleted successfully." });
  });
};

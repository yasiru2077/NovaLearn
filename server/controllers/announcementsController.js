import { db } from "../connect.js";

// ➤ CREATE an Announcement
export const createAnnouncement = (req, res) => {
  const { course_id, lecturer_id, message } = req.body;

  if (!course_id || !lecturer_id || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query =
    "INSERT INTO announcements (course_id, lecturer_id, message) VALUES (?, ?, ?)";

  db.query(query, [course_id, lecturer_id, message], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(201).json({
      message: "Announcement posted successfully!",
      announcementId: result.insertId,
    });
  });
};

// ➤ READ Announcements for a Course
export const getAnnouncements = (req, res) => {
  const { course_id } = req.query;

  if (!course_id)
    return res.status(400).json({ message: "Course ID is required." });

  const query = `
        SELECT a.*, l.username AS lecturer_name 
        FROM announcements a 
        JOIN lmsAuth l ON a.lecturer_id = l.id 
        WHERE a.course_id = ? 
        ORDER BY a.posted_at DESC`;

  db.query(query, [course_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(200).json(results);
  });
};

export const getAllAnnouncements = (req, res) => {
  const query = `
        SELECT a.*, l.username AS lecturer_name
        FROM announcements a
        JOIN lmsAuth l ON a.lecturer_id = l.id
        ORDER BY a.posted_at DESC`;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    
    res.status(200).json(results);
  });
};

// ➤ UPDATE an Announcement (Only the Lecturer Can Update)
export const updateAnnouncement = (req, res) => {
  const { id } = req.params;
  const { lecturer_id, message } = req.body;

  if (!message || !lecturer_id)
    return res
      .status(400)
      .json({ message: "Lecturer ID and message are required." });

  const updateQuery =
    "UPDATE announcements SET message = ? WHERE id = ? AND lecturer_id = ?";

  db.query(updateQuery, [message, id, lecturer_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res
        .status(403)
        .json({ message: "Unauthorized or announcement not found." });

    res.status(200).json({ message: "Announcement updated successfully!" });
  });
};

// ➤ DELETE an Announcement (Only the Lecturer Can Delete)
export const deleteAnnouncement = (req, res) => {
  const { id } = req.params;
  const { lecturer_id } = req.body;

  if (!lecturer_id)
    return res.status(400).json({ message: "Lecturer ID is required." });

  const deleteQuery =
    "DELETE FROM announcements WHERE id = ? AND lecturer_id = ?";

  db.query(deleteQuery, [id, lecturer_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res
        .status(403)
        .json({ message: "Unauthorized or announcement not found." });

    res.status(200).json({ message: "Announcement deleted successfully!" });
  });
};

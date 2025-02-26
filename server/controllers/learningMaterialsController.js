import { db } from "../connect.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

// ➤ Add Learning Material (with File Upload)
export const addMaterial = (req, res) => {
  const { course_id, title, material_type } = req.body;
  const file = req.file; // Uploaded file

  if (!course_id || !title || !material_type || !file) {
    return res
      .status(400)
      .json({ message: "All fields are required, including file upload." });
  }

  const material_link = `/uploads/${file.filename}`; // Save file path

  const query =
    "INSERT INTO learning_materials (course_id, title, material_type, material_link) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [course_id, title, material_type, material_link],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res
        .status(201)
        .json({
          message: "Material uploaded successfully!",
          materialId: result.insertId,
        });
    }
  );
};

// ➤ Get All Learning Materials (Optional: Filter by Course)
export const getMaterials = (req, res) => {
  const { course_id } = req.query;
  let query = "SELECT * FROM learning_materials";
  let params = [];

  if (course_id) {
    query += " WHERE course_id = ?";
    params.push(course_id);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};

// ➤ Update Learning Material (With Optional File Replacement)
export const updateMaterial = (req, res) => {
  const { id } = req.params;
  const { title, material_type } = req.body;
  const file = req.file; // New file (optional)

  if (!title || !material_type) {
    return res
      .status(400)
      .json({ message: "Title and Material Type are required." });
  }

  // Get existing material link
  const getQuery = "SELECT material_link FROM learning_materials WHERE id = ?";
  db.query(getQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Material not found." });

    let material_link = results[0].material_link;

    // If a new file is uploaded, replace the old file
    if (file) {
      // Delete old file
      const oldFilePath = `.${material_link}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      material_link = `/uploads/${file.filename}`;
    }

    // Update material in database
    const updateQuery =
      "UPDATE learning_materials SET title = ?, material_type = ?, material_link = ? WHERE id = ?";
    db.query(
      updateQuery,
      [title, material_type, material_link, id],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Material not found." });

        res.status(200).json({ message: "Material updated successfully!" });
      }
    );
  });
};

// ➤ Delete Learning Material (Remove File from Server)
export const deleteMaterial = (req, res) => {
  const { id } = req.params;

  // Get the file path before deleting
  const getQuery = "SELECT material_link FROM learning_materials WHERE id = ?";
  db.query(getQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Material not found." });

    const filePath = `.${results[0].material_link}`;

    // Delete the record from the database
    const deleteQuery = "DELETE FROM learning_materials WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Material not found." });

      // Remove the file from the server
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(200).json({ message: "Material deleted successfully!" });
    });
  });
};

// Export Multer Upload Middleware
export { upload };

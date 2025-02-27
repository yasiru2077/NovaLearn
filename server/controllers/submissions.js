import { db } from "../connect.js";
import multer from "multer";
import path from "path";

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ➤ Add a New Submission
export const addSubmission = (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        
        const { assignment_id, student_id } = req.body;
        if (!assignment_id || !student_id || !req.file) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        const file_link = `/uploads/${req.file.filename}`;
        const query = "INSERT INTO submissions (assignment_id, student_id, file_link) VALUES (?, ?, ?)";
        
        db.query(query, [assignment_id, student_id, file_link], (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ message: "Submission added successfully!", submissionId: result.insertId });
        });
    });
};

// ➤ Get All Submissions
export const getSubmissions = (req, res) => {
    const { assignment_id, student_id } = req.query;
    let query = "SELECT s.*, a.title as assignment_title, u.username as student_name FROM submissions s LEFT JOIN assignments a ON s.assignment_id = a.id LEFT JOIN lmsAuth u ON s.student_id = u.id";
    let conditions = [];
    let params = [];

    if (assignment_id) {
        conditions.push("s.assignment_id = ?");
        params.push(assignment_id);
    }

    if (student_id) {
        conditions.push("s.student_id = ?");
        params.push(student_id);
    }

    if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY s.submitted_at DESC";

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
};

// ➤ Get a Submission by ID
export const getSubmissionById = (req, res) => {
    const { id } = req.params;
    
    const query = "SELECT s.*, a.title as assignment_title, u.username as student_name FROM submissions s LEFT JOIN assignments a ON s.assignment_id = a.id LEFT JOIN lmsAuth u ON s.student_id = u.id WHERE s.id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Submission not found." });

        res.status(200).json(results[0]);
    });
};

// ➤ Grade a Submission
export const gradeSubmission = (req, res) => {
    const { id } = req.params;
    const { grade, feedback } = req.body;

    if (grade === undefined || feedback === undefined) {
        return res.status(400).json({ message: "Grade and feedback are required." });
    }

    const updateQuery = "UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?";
    
    db.query(updateQuery, [grade, feedback, id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Submission not found." });

        res.status(200).json({ message: "Submission graded successfully!" });
    });
};

// ➤ Update a Submission
export const updateSubmission = (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "File is required." });
        }
        
        const file_link = `/uploads/${req.file.filename}`;
        const updateQuery = "UPDATE submissions SET file_link = ?, submitted_at = CURRENT_TIMESTAMP WHERE id = ?";
        
        db.query(updateQuery, [file_link, id], (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Submission not found." });
            
            res.status(200).json({ message: "Submission updated successfully!" });
        });
    });
};

// ➤ Delete a Submission
export const deleteSubmission = (req, res) => {
    const { id } = req.params;
    
    const query = "DELETE FROM submissions WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Submission not found." });

        res.status(200).json({ message: "Submission deleted successfully!" });
    });
};
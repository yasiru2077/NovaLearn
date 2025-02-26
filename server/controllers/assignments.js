import { db } from "../connect.js";

// ➤ Add a New Assignment
export const addAssignment = (req, res) => {
    const { course_id, title, description, due_date } = req.body;

    if (!course_id || !title || !description || !due_date) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = "INSERT INTO assignments (course_id, title, description, due_date) VALUES (?, ?, ?, ?)";

    db.query(query, [course_id, title, description, due_date], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Assignment added successfully!", assignmentId: result.insertId });
    });
};

// ➤ Get All Assignments (Optional: Filter by Course)
export const getAssignments = (req, res) => {
    const { course_id } = req.query;
    let query = "SELECT * FROM assignments";
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

// ➤ Get a Single Assignment by ID
export const getAssignmentById = (req, res) => {
    const { id } = req.params;
    
    const query = "SELECT * FROM assignments WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Assignment not found." });

        res.status(200).json(results[0]);
    });
};

// ➤ Update an Assignment
export const updateAssignment = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    if (!title || !description || !due_date) {
        return res.status(400).json({ message: "Title, description, and due date are required." });
    }

    const updateQuery = "UPDATE assignments SET title = ?, description = ?, due_date = ? WHERE id = ?";
    
    db.query(updateQuery, [title, description, due_date, id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Assignment not found." });

        res.status(200).json({ message: "Assignment updated successfully!" });
    });
};

// ➤ Delete an Assignment
export const deleteAssignment = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM assignments WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Assignment not found." });

        res.status(200).json({ message: "Assignment deleted successfully!" });
    });
};

import { db } from "../connect.js";

// ➤ CREATE a Quiz
export const createQuiz = (req, res) => {
  const { course_id, title, questions } = req.body;

  if (
    !course_id ||
    !title ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Course ID, title, and questions are required." });
  }

  // Insert into quizzes table
  const quizQuery = "INSERT INTO quizzes (course_id, title) VALUES (?, ?)";
  db.query(quizQuery, [course_id, title], (err, quizResult) => {
    if (err) return res.status(500).json({ message: err.message });

    const quiz_id = quizResult.insertId;

    // Insert questions
    const questionQuery = `
            INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option) 
            VALUES ?`;

    const questionValues = questions.map((q) => [
      quiz_id,
      q.question,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_option,
    ]);

    db.query(questionQuery, [questionValues], (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res
        .status(201)
        .json({ message: "Quiz created successfully!", quizId: quiz_id });
    });
  });
};

// ➤ GET All Quizzes for a Course
export const getQuizzes = (req, res) => {
  const { course_id } = req.query;

  if (!course_id)
    return res.status(400).json({ message: "Course ID is required." });

  const query =
    "SELECT * FROM quizzes WHERE course_id = ? ORDER BY created_at DESC";
  db.query(query, [course_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(200).json(results);
  });
};

// ➤ GET a Quiz with Questions
export const getQuizById = (req, res) => {
  const { id } = req.params;

  const quizQuery = "SELECT * FROM quizzes WHERE id = ?";
  const questionsQuery = "SELECT * FROM quiz_questions WHERE quiz_id = ?";

  db.query(quizQuery, [id], (err, quizResults) => {
    if (err) return res.status(500).json({ message: err.message });
    if (quizResults.length === 0)
      return res.status(404).json({ message: "Quiz not found." });

    db.query(questionsQuery, [id], (err, questionResults) => {
      if (err) return res.status(500).json({ message: err.message });

      res
        .status(200)
        .json({ quiz: quizResults[0], questions: questionResults });
    });
  });
};

// ➤ UPDATE a Quiz Title
export const updateQuiz = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required." });

  const updateQuery = "UPDATE quizzes SET title = ? WHERE id = ?";
  db.query(updateQuery, [title, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Quiz not found." });

    res.status(200).json({ message: "Quiz updated successfully!" });
  });
};

// ➤ DELETE a Quiz (Deletes All Related Questions)
export const deleteQuiz = (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM quizzes WHERE id = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Quiz not found." });

    res.status(200).json({ message: "Quiz deleted successfully!" });
  });
};

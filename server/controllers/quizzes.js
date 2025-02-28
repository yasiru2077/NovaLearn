import { query } from "express";
import { db } from "../connect.js";

// Create a new quiz
export const createQuiz = (req, res) => {
  // const { course_id, title } = req.body;
  // try {
  //   const [result] =  db.execute(
  //     "INSERT INTO quizzes (course_id, title) VALUES (?, ?)",
  //     [course_id, title]
  //   );
  //   res.status(201).json({ message: "Quiz created", quizId: result.insertId });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  const { course_id, title } = req.body;
  if (!course_id || !title) {
    return res.status(400).json({ message: "Course ID and Title required." });
  }

  const query = "INSERT INTO quizzes (course_id, title) VALUES (?, ?)";

  db.query(query, [course_id, title], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Quiz created successfully",
      enrollmentId: result.insertId,
    });
  });
};

// Get all quizzes
export const getAllQuizzes = (req, res) => {
  const query = "SELECT * FROM quizzes";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });

  // try {
  //   const [results] =  db.execute("SELECT * FROM quizzes");
  //   res.json(results);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};

// Get a single quiz by ID
export const getQuizById = (req, res) => {
  // try {
  //   const [results] = await db.execute("SELECT * FROM quizzes WHERE id = ?", [
  //     quizId,
  //   ]);
  //   if (results.length === 0)
  //     return res.status(404).json({ message: "Quiz not found" });
  //   res.json(results[0]);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  const quizId = req.params.id;
  const query = "SELECT * FROM quizzes WHERE id = ?";

  db.query(query, [quizId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(result[0]);
  });
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  // const quizId = req.params.id;
  // try {
  //   const [result] = await db.execute("DELETE FROM quizzes WHERE id = ?", [
  //     quizId,
  //   ]);
  //   if (result.affectedRows === 0)
  //     return res.status(404).json({ message: "Quiz not found" });
  //   res.json({ message: "Quiz deleted" });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  const quizId = req.params.id;
  const query = "DELETE FROM quizzes WHERE id = ?";

  db.query(query, [quizId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted" });
  });
};

// Add a question to a quiz
// export const addQuestion = async (req, res) => {
//   const quizId = req.params.quizId;
//   const { question, option_a, option_b, option_c, option_d, correct_option } =
//     req.body;

//   try {
//     const [quizExists] = await db.execute(
//       "SELECT id FROM quizzes WHERE id = ?",
//       [quizId]
//     );
//     if (quizExists.length === 0)
//       return res.status(404).json({ message: "Quiz not found" });

//     const [result] = await db.execute(
//       "INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [quizId, question, option_a, option_b, option_c, option_d, correct_option]
//     );
//     res
//       .status(201)
//       .json({ message: "Question added", questionId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const addQuestion = (req, res) => {
  const quizId = req.params.quizId;
  const { question, option_a, option_b, option_c, option_d, correct_option } =
    req.body;

  // Check if the quiz exists
  const checkQuizQuery = "SELECT id FROM quizzes WHERE id = ?";
  db.query(checkQuizQuery, [quizId], (err, quizExists) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (quizExists.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Add the question
    const insertQuestionQuery =
      "INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuestionQuery,
      [
        quizId,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res
          .status(201)
          .json({ message: "Question added", questionId: result.insertId });
      }
    );
  });
};

// Get all questions for a quiz
// export const getQuestions = async (req, res) => {
//   const quizId = req.params.quizId;
//   try {
//     const [results] = await db.execute(
//       "SELECT * FROM quiz_questions WHERE quiz_id = ?",
//       [quizId]
//     );
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getQuestions = (req, res) => {
  const quizId = req.params.quizId;
  const query = "SELECT * FROM quiz_questions WHERE quiz_id = ?";

  db.query(query, [quizId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};

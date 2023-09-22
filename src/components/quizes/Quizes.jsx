import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './quizes.css';

export default function Quizes() {
  const location = useLocation();
  const path = decodeURIComponent(location.pathname.split("/")[2]);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const getQuizes = async () => {
      try {
        const res = await axios.get("/quiz/" + path);
        console.log(res.data);
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    getQuizes();
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/quiz/" + id);
      // Optionally, you can also update the quiz state to remove the deleted quiz
      setQuiz(quiz.filter((quizData) => quizData._id !== id));
      console.log("Quiz deleted");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className='qustonReviewBlocks'>
      {quiz
        .filter((quizData) => quizData.title === path)
        .map((quizData) => (
          <div key={quizData._id}>
            <h2>{quizData.title}</h2>
            <div>
              {quizData.questions.map((question, index) => (
                <div key={index}>
                  <h2>{question.questionText}</h2>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        className={optionIndex === question.correctOptionIndex ? 'correct' : ''}
                      >
                        {option}
                        {optionIndex === question.correctOptionIndex && <span className="correct-mark">(Correct)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className='reviewQuestionBtns'>
                <i className="fa-solid fa-trash" onClick={() => handleDelete(quizData._id)}></i>
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

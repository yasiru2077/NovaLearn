import React, { useContext, useEffect, useState } from 'react';
import SecondaryNav from '../SecondaryNav/SecondaryNav';
import './qustions.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';

function Qustions() {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const path = decodeURIComponent(location.pathname.split("/")[2]);
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const name = user?.username;

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/answers/", {
        title: path,
        score: score,
        username: name,
      });
      response.data && window.location.replace("/subject");

      // Handle the response if needed
      console.log(response.data);
    } catch (error) {
      console.log("error piggi");
      console.error("Error submitting answer sheet:", error);
    }
  };

  return (
    <div className='qustions'>
      <SecondaryNav />
      <h2 className='TopicName'>{path}</h2>
      <h3 className='Score'>Score: {score}</h3>
      <form className='Quiz-AnswerForm' onSubmit={handleSubmit}>
        {quiz
          .filter((quizData) => quizData.title === path)
          .map((quizData, quizIndex) => (
            <div className='qustion-order' key={quizData._id}>
              <div className='questionblock'>
                {quizData.questions.map((question, questionIndex) => (
                  <div key={questionIndex}>
                    <h2 className='question-text'>{`Question ${quizIndex + 1}: ${question.questionText}`}{question.correctOptionIndex}</h2>
                    <ul className='option-answer'>
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className={optionIndex === question.correctOptionIndex ? 'correct' : ''}
                        >
                          
                          {optionIndex + 1}){option}
                        </li>
                      ))}
                      <input
                      style={{
                        outline: 'none',
                        appearance:'none',
                      }}
                        type="number"
                        className='useranswers'
                        onChange={(e) => {
                          const userAnswer = parseInt(e.target.value, 10);
                          if (userAnswer === question.correctOptionIndex) {
                            setScore(score + 1);
                          }else{
                            setScore(score);
                          }
                        }}
                      />
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {/* Removed the hidden inputs as they are not needed */}
        <button className='Answer-Submittion' type='submit'>Complete</button>
        <button className='Answer-Submittion' type='button'>Cancel Attempt</button>
      </form>
    </div>
  );
}

export default Qustions;

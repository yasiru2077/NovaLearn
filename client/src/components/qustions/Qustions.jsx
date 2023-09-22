import React, { useEffect, useState } from 'react'
import SecondaryNav from '../SecondaryNav/SecondaryNav'
import './qustions.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Qustions() {
    const location = useLocation();
  const path = decodeURIComponent(location.pathname.split("/")[2]);
  const [quiz, setQuiz] = useState([]);
  const [answerOptionIndex,setanswerOptionIndex]= useState("");
  const [error,setError]= useState(false);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    try{
        const res=await axios.post("/answers/",{
          answerOptionIndex,

        });
        res.data && window.location.replace("/subject");
      }catch(err){
        setError(true)
    }
  };

  const handleAnswerChange = (e) => {
    setanswerOptionIndex(e.target.value);
  };

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




  return (
    <div className='qustions'>
            <SecondaryNav/>
           <h2 className='TopicName'>{path}</h2>
           <form className='Quiz-AnswerForm' onSubmit={handleSubmit}>
           
            {quiz
        .filter((quizData) => quizData.title === path)
        .map((quizData) => (
          <div className='qustion-order' key={quizData._id}>
            <div>
              {quizData.questions.map((question, index) => (
                <div key={index}>
                  <h2 className='question-text'>{question.questionText}</h2>
                  <input type="text" placeholder='Enter The Answer'/>
                  <ul className='option-answer'>
                    {question.options.map((option, optionIndex) => (
                      
                      <li
                        key={optionIndex}
                        className={optionIndex === question.correctOptionIndex ? 'correct' : ''}
                      >
                       {/* <input
        type="radio"
        name={`question_${optionIndex}`} // Use a unique name for each question
        value={optionIndex}
        checked={answerOptionIndex === optionIndex}
        onChange={handleAnswerChange}
      /> */}
                        
                        {option}
                        {optionIndex === question.correctOptionIndex && <span className="correct-mark">(Correct)</span>}
                        
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
            </div>
          </div>
        ))}
         <button className='Answer-Submittion' type='submit'>Complete</button>
         <button className='Answer-Submittion' type='submit'>Cancel Attempt</button>
        </form>
    </div>
  )
}

export default Qustions
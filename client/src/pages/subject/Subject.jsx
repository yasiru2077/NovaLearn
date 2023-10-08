import React, { useEffect, useState } from 'react';
import './subject.css';
import SecondaryNav from '../../components/SecondaryNav/SecondaryNav';
import axios from 'axios';
import QuizTitlesStudents from '../../components/quiztitlesStudents/QuizTitlesStudents';
import Ranking from '../../components/ranking/Ranking';
import TotalScore from '../../components/ranking/TotalScore';

function Subject() {
  const [quiz, setQuiz] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [answer1, setAnswer1] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get("/quiz");
      setQuiz(res.data);
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    const fetchAnswer = async () => {
      const res = await axios.get(`/answers/`);
      setAnswer(res.data);
    };
    
    fetchAnswer(); // Make sure to pass the correct quiz title
  }, [quiz]);

  useEffect(() => {
    const fetchAnswer1 = async () => {
      const res = await axios.get(`/answers/`);
      setAnswer1(res.data);
    };
    
    fetchAnswer1(); // Make sure to pass the correct quiz title
  },[]);

  return (
    <>
      <div className='main-page'>
        <SecondaryNav />
        <TotalScore answers1={answer1}/>
        <div className='SubjectPage'>
          <QuizTitlesStudents quizes={quiz} answers={answer} />
        </div>
      </div>
    </>
  );
}

export default Subject;

import React, { useEffect, useState } from 'react'
import './subject.css'
import SecondaryNav from '../../components/SecondaryNav/SecondaryNav'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import QuizTitle from '../../components/quiztitles/QuizTitle';
import QuizTitlesStudents from '../../components/quiztitlesStudents/QuizTitlesStudents';
import Ranking from '../../components/ranking/Ranking';

function Subject() {
  const [quiz,setQuiz]=useState([]);
  
  
      useEffect(() => {
        const fetchQuiz = async () => {
     
            const res = await axios.get("/quiz");
           setQuiz(res.data)
            
         
        }
    
        fetchQuiz();
      }, []);



  return (
    <>
    <div className='main-page'>
    <SecondaryNav/>
    <Ranking/>
    <div className='SubjectPage'>
   
    <QuizTitlesStudents quizes={quiz}/>
    </div>
    </div>
   
    </>
  )
}

export default Subject
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import QuizTitle from '../quiztitles/QuizTitle';
import TeachersQuizSideBar from '../sidebar/adminsidebar/teachersQuizSidebar/TeachersQuizSideBar';
import TeacherNav from '../teachersNavBar/TeacherNav';
import "./quizReview.css";

export default function QuizReview() {
    
  const [quiz,setQuiz]=useState([]);
  
  useEffect(() => {
    const fetchQuiz = async () => {
 
        const res = await axios.get("/quiz");
       setQuiz(res.data)
        
     
    }

    fetchQuiz();
  }, []);
  return (
   
    <div>
            <TeacherNav/>
            <TeachersQuizSideBar/>
            <QuizTitle quizes={quiz}/>
            
            
    </div>
  )
}

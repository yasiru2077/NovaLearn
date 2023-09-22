import axios from 'axios';
import React, { useEffect, useState } from 'react'
import QuizTitle from '../quiztitles/QuizTitle';
import TeachersQuizSideBar from '../sidebar/adminsidebar/teachersQuizSidebar/TeachersQuizSideBar';
import TeacherNav from '../teachersNavBar/TeacherNav';
import "./quizReview.css";
import MainSidebar from '../mainsidebar/MainSidebar';
import TeachersNavBar2 from '../teachersnavbar2/TeachersNavBar2';

export default function QuizReview() {
    
  
  return (
   
    <div className='dispalyTitles'>
            
            <TeachersNavBar2/>
            <MainSidebar/>
           
            
            
    </div>
  )
}

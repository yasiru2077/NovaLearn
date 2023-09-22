import React from 'react'
import TitlesOfunits from '../titlesOfUnits/TitlesOfunits';
import { Link } from 'react-router-dom';
import './quizStudent.css';

function QuizTitleStudents({quiz}) {
    const uniqueTitles = new Set();
  return (
    <div className='singleTopic'>
      <Link className='quizStudentTitleNames' to={`/subject/${quiz.title}`}>
      <i class="mathStu fa-regular fa-circle-dot"></i>
      {quiz.title}
      </Link>
      <p className='unitMarks'>6/10</p>
    </div>
  )
}

export default QuizTitleStudents
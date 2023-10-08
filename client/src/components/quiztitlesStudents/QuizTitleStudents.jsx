import React from 'react';
import TitlesOfunits from '../titlesOfUnits/TitlesOfunits';
import { Link } from 'react-router-dom';
import './quizStudent.css';

function QuizTitleStudents({ quiz, answer }) {

  
  return (
    <div className='singleTopic'>
      <Link className='quizStudentTitleNames' to={`/subject/${quiz.title}`}>
        <i className="mathStu fa-regular fa-circle-dot"></i>
        {quiz.title}
      </Link>
      <p className='unitMarks'>{answer ? answer.score : ''}/5</p>
     
    </div>
  );
}

export default QuizTitleStudents;

import React, { useContext } from 'react';
import QuizTitleStudents from './QuizTitleStudents';
import './quizStudent.css';
import { Context } from '../../context/Context';

function QuizTitlesStudents({ quizes, answers }) {
  const uniqueTitles = new Set();
 

  return (
    <div className='allTopics'>
      {quizes.map((q) => {
        if (!uniqueTitles.has(q.title)) {
          // Add the title to the set of unique titles
          uniqueTitles.add(q.title);

          // Find the corresponding answer for the current quiz
          const correspondingAnswer = answers.find((a) => a.title === q.title);

          return <QuizTitleStudents quiz={q} key={q.title} answer={correspondingAnswer} />;
        }
        return null; // Skip rendering the component
      })}
    </div>
  );
}

export default QuizTitlesStudents;

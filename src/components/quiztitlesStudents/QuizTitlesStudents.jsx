import React from 'react'
import QuizTitleStudents from './QuizTitleStudents';
import './quizStudent.css';

function QuizTitlesStudents({quizes}) {
  const uniqueTitles = new Set();
  return (
    <div className='allTopics'>
      
         {quizes.map((q) => {
        if (!uniqueTitles.has(q.title)) {
          // Add the title to the set of unique titles
          uniqueTitles.add(q.title);

          return <QuizTitleStudents quiz={q} key={q.title} />;
        }
        return null; // Skip rendering the component
      })}
     
    </div>
  )
}

export default QuizTitlesStudents
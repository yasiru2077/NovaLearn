import React from 'react'
import TitlesOfunits from '../titlesOfUnits/TitlesOfunits'
import './quiztitle.css';

export default function QuizTitle({quizes}) {
  const uniqueTitles = new Set();
  return (
    <div className='titleBlock'> 
      {quizes.map((q) => {
        if (!uniqueTitles.has(q.title)) {
          // Add the title to the set of unique titles
          uniqueTitles.add(q.title);

          return <TitlesOfunits quiz={q} key={q.title} />;
        }
        return null; // Skip rendering the component
      })}
    </div>
  )
}

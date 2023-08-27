import React from 'react'
import TitlesOfunits from '../titlesOfUnits/TitlesOfunits'

export default function QuizTitle({quizes}) {
  const uniqueTitles = new Set();
  return (
    <div>
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

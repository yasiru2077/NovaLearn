import React, { useContext } from 'react';
import TotalScoreCounter from './TotalScoreCounter';
import { Context } from '../../context/Context';
import Ranking from './Ranking';
import './ranking.css';

function TotalScore({ answers1 }) {
  const { user, dispatch } = useContext(Context);

  // Filter the answers for the current user and extract their scores
  const userAnswers = answers1.filter(a => a.username === user.username);
  const scores = userAnswers.map(a => a.score);

  // Calculate the total score using reduce
  const totalScore = scores.reduce((accumulator, currentScore) => accumulator + currentScore, 0);

  return (
    <div>
     
      {userAnswers.map(a => (
        <h1 hidden key={a.id}>{a.score}</h1>
      ))}
      <h1 className='TotalScore'>
       Total Score: {totalScore}/25
      </h1>
      
      <Ranking totalScore={totalScore} />
    </div>
  );
}

export default TotalScore;

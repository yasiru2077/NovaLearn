import React, { useEffect, useState } from 'react';
import './ranking.css';

function Ranking() {
  let userRank = "good";

  const [isRotating, setIsRotating] = useState(false);
  const rotationClass = isRotating ? 'rotate-animation' : '';

  const handleIconClick = () => {
    setIsRotating(!isRotating);
  };

  if (userRank === "great") {
    return (
      <div className={`ranking-part`} onClick={handleIconClick}>
        <p className='rating-qoute'>You're Great!</p>
        <div className="Rankgroup">
          <i className={`rank-icon fa-solid fa-certificate ${rotationClass}`}></i>
        </div>
      </div>
    );
  } else if (userRank === "very good") {
    return (
      <div className={`ranking-part`} onClick={handleIconClick}>
        <p className='rating-qoute'>Very Good!</p>
        <div className="Rankgroup">
          <i className={`rank-icon fa-solid fa-star ${rotationClass}`}></i>
          <i className={`rank-icon fa-solid fa-star ${rotationClass}`}></i>
        </div>
      </div>
    );
  }
  else if (userRank === "good") {
    return (
      <div className={`ranking-part`} onClick={handleIconClick}>
        <p className='rating-qoute'>Good! few more steps</p>
        <div className="Rankgroup">
          <i className={`rank-icon fa-solid fa-star ${rotationClass}`}></i>
          <i className={`rank-icon fa-solid fa-star ${rotationClass}`}></i>
        </div>
      </div>
    );
  }else if (userRank === "nice") {
    return (
      <div className={`ranking-part`} onClick={handleIconClick}>
        <p className='rating-qoute'>Nice! Keep It Up</p>
        <div className="Rankgroup">
          <i className={`rank-icon fa-solid fa-star ${rotationClass}`}></i>
        </div>
      </div>
    );
  }
  else {
    return null; // Return null if userRank is not "great" or "very good"
  }
}

export default Ranking;

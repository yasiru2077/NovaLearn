import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import './secondarynav.css';
import { Link } from 'react-router-dom';

function SecondaryNav() {
    const {user,dispatch}=useContext(Context);
    const handleLogout = ()=>{
      dispatch({type:"LOGOUT"});
    };
    const username = user?.username;
    const grade = user?.grade;
    const Subject1 = user?.subject1;
    const Subject2 = user?.subject2;
    const Subject3 = user?.subject3;
    
    const handleHomePage = ()=>{
      window.location.replace("/login");
    };

  return (
    <div className='secondaryNav'>
      
    <div className='topCenter'>
      <i className="rankingstar fa-solid fa-ranking-star"></i>
      <i class="results fa-solid fa-graduation-cap"></i>
      {user && <i onClick={handleLogout} class="logoutpri fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>}
    
      <i onClick={handleHomePage} class="fa-solid fa-house"></i>
    
    </div>
    <div className='topleft'>
        <img src="./images/me.svg" alt="" />
    </div>
    <div className="topright">
      <ul>
        <li>English</li>
        <li><Link to="/subject"> Mathematics </Link></li>
        <li>Science</li>
        <li>History</li>
        <li>{Subject1}</li>
        <li>{Subject2}</li>
        <li>{Subject3}</li>
      </ul>
    </div>
  </div>
  )
}

export default SecondaryNav
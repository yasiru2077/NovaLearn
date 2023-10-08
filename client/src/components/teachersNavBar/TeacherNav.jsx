import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import './teachernav.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default function TeacherNav() {
  const {user,dispatch}=useContext(Context);
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  };

  const currentuser = user.username;

  return (
    <div className="teachersNav">
      
          <ul>
            <Link to="/login">
            <li className='teacherNavItem'>
                {currentuser}
              </li>
            </Link>
              
              <Link to="/quiz">
              <li className='teacherNavItem'>Quizzes</li>
              </Link>
              
              <li className='teacherNavItem'>Assignment</li>
              <li className='teacherNavItem'>GradeBook</li>
              <li className='teacherNavItem'>Announcement</li>
              
          </ul>
          <ul>
            {user &&<li onClick={handleLogout}><i class="logoutTeach fa-solid fa-arrow-right-from-bracket fa-fade"></i></li>}
          </ul>
            
           
    </div>
  )
}

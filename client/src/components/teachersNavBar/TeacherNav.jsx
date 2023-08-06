import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import './teachernav.css'

export default function TeacherNav() {
  const {user,dispatch}=useContext(Context);
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <div className="teachersNav">
      
          <ul>
              <li className='teacherNavItem'>
                Dashboard
              </li>
              <li className='teacherNavItem'>Quizzes</li>
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

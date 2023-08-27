import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import './adminNavbar.css'
import { Link } from 'react-router-dom';

export default function AdminNavBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

    const name = user?.username;
  return (
    <div className='AdminNav'>
      <Link to="/login">
        <span className='AdminD'>{name}</span>
      </Link>


      <ul>
        <Link to="/events">
          <i className="announcements fa-solid fa-bullhorn"></i>
        </Link>
        <Link to="/register">
          <li><i className="register fa-solid fa-pen-nib"></i></li>
        </Link>
        {user && <li onClick={handleLogout}><i className="logout fa-solid fa-right-from-bracket"></i></li>}
        <Link to="/login">
          <i className="dash fa-brands fa-dashcube"></i>
        </Link>
        
      </ul>
    </div>
  )
}

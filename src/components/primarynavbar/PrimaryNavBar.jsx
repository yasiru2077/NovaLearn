import { useContext } from 'react';
import './prnavbar.css'
import { Context } from '../../context/Context';

export default function PrimaryNavBar() {
  const {user,dispatch}=useContext(Context);
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <div className='primaryNav'>
      
      <div className='topCenter'>
        <i className="rankingstar fa-solid fa-ranking-star"></i>
        <i class="results fa-solid fa-graduation-cap"></i>
        {user && <i onClick={handleLogout} class="logoutpri fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>}
      </div>
      <div className='topleft'>
          <img src="./images/me.svg" alt="" />
      </div>
      <div className="topright">
        <ul>
          <li>English</li>
          <li>Mathematics</li>
          <li>Science</li>
          <li>Geography</li>
          
        </ul>
      </div>
    </div>
  )
}

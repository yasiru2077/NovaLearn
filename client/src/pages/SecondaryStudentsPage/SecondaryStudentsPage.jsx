import React, { useContext } from 'react'
import { Context } from '../../context/Context';

function SecondaryStudentsPage() {
    const {user,dispatch}=useContext(Context);
    const handleLogout = ()=>{
      dispatch({type:"LOGOUT"});
    };
  return (
    <div>SecondaryStudentsPage
        <ul>
            {user &&<li onClick={handleLogout}><i class="logoutTeach fa-solid fa-arrow-right-from-bracket fa-fade"></i></li>}
        </ul>
    </div>
  )
}

export default SecondaryStudentsPage
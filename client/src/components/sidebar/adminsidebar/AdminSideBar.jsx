import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/Context';
import'./adminSideBar.css'


export default function AdminSideBar() {
    
  return (
    <div className='AdminSideBar'>
           

          
           
<div class="sidebar">
 
  <Link  activeClassName='active'  className='registerLinks' to="/secondaryRegister">Secondary Students</Link>
  <Link  activeClassName='active'  className='registerLinks' to="/register">Primary Students</Link>
  <Link  activeClassName='active'  className='registerLinks' to="/TeachersRegister">Teachers</Link>
</div>  
</div>
  )
}

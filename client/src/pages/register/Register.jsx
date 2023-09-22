import React, { useState } from 'react'
import "./register.css"
import axios from 'axios';
import AdminNavBar from '../../components/adminnavbar/AdminNavBar';
import AdminSideBar from '../../components/sidebar/adminsidebar/AdminSideBar';
export default function Register() {

  const [username,setUsername]=  useState("");
  const [email,setEmail]= useState("");
  const [role,setRole]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(false);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    try{
        const res=await axios.post("/users/register",{
          username,
          email,
          role,
          password,
        });
        res.data && window.location.replace("/login");
      }catch(err){
        setError(true)
    }
  };

  let addingState;

  if(role==="1"){
    addingState = "you can't register another admin!";
  }
  return (
    <div>
     <AdminNavBar/>
     <AdminSideBar/>
   
    <div className="registerUser">
        
         <form className="registerForm" onSubmit={handleSubmit}>
            <h1>Enter User Details</h1>
            <label htmlFor="username" ></label>
            <input type="text" className="username" placeholder='Username' 
             onChange={e=>setUsername(e.target.value)}
            />
            <label htmlFor="username" ></label>
            <input type="text" className="username" placeholder='Email' 
             onChange={e=>setEmail(e.target.value)}
            />
             <label htmlFor="username" ></label>
            <input type="text" className="username" placeholder='Role' 
             onChange={e=>setRole(e.target.value)} 
            />
             <h4>{addingState}</h4>
            <label htmlFor="password"></label>
            <input type="password" className="password" placeholder='Password'
             onChange={e=>setPassword(e.target.value)} 
            />
            <button className='registerButton2' type='submit'>register</button>
           
        </form>
       
    </div>
    </div>
  )
}

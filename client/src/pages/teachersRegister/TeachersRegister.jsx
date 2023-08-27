import axios from 'axios';
import React, { useState } from 'react'
import AdminNavBar from '../../components/adminnavbar/AdminNavBar';
import AdminSideBar from '../../components/sidebar/adminsidebar/AdminSideBar';

export default function TeachersRegister() {
  const [username,setUsername]=  useState("");
  const [email,setEmail]= useState("");
  const [role,setRole]=useState("");
  const [teacher_class,setTeacher_class]= useState("");
  const [teaching_subject,setTeaching_Subject]=useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(false);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    try{
        const res=await axios.post("/teachers/register",{
          username,
          email,
          role,
          teacher_class,
          teaching_subject,
          password,

        });
        
        res.data && window.location.replace("/TeachersRegister");
       
      }catch(err){
        setError(true)
    }
  };


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
            <label htmlFor="username" ></label>
           <input type="text" className="username" placeholder='Class' 
            onChange={e=>setTeacher_class(e.target.value)} 
           />
            <input type="text" className="username" placeholder='Enter the Subject' 
            onChange={e=>setTeaching_Subject(e.target.value)} 
           />
          
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

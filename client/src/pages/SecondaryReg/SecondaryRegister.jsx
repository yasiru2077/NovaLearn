import React, { useState } from 'react'
import "./SecondaryRegister.css"
import axios from 'axios';
import AdminNavBar from '../../components/adminnavbar/AdminNavBar';

export default function SecondaryRegister() {
    const [username,setUsername]=  useState("");
    const [email,setEmail]= useState("");
    const [role,setRole]= useState("");
    const [StId,setStId]= useState("");
    const [st_class,setSt_class]= useState("");
    const [grade,setGrade]= useState("");
    const [subject1,setSubject1]= useState("");
    const [subject2,setSubject2]= useState("");
    const [subject3,setSubject3]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState(false);
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError(false);
        try{
            const res=await axios.post("/students/register",{
              username,
              email,
              role,
              StId,
              st_class,
              grade,
              subject1,
              subject2,
              subject3,
              password,

            });
            res.data && window.location.replace("/login");
          }catch(err){
            setError(true)
        }
      };

      const handleSubjectChange = (e) => {
        setSubject1(e.target.value);
      };
      

  return (
    <div>
    <AdminNavBar/>
  
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
           <input type="text" className="username" placeholder='Enter Student Id' 
            onChange={e=>setStId(e.target.value)}
           />
            <label htmlFor="username" ></label>
           <input type="text" className="username" placeholder='Enter Student Class' 
            onChange={e=>setSt_class(e.target.value)}
           />
            <label htmlFor="username" ></label>
           <input type="text" className="username" placeholder='Enter the Grade' 
            onChange={e=>setGrade(e.target.value)}
           />
           
             <label htmlFor="username" ></label>
           <input type="text" className="username" placeholder='Enter subject2 name' 
            onChange={e=>setSubject2(e.target.value)}
           />
             <label htmlFor="username" ></label>
           <input type="text" className="username" placeholder='Enter subject3 name' 
            onChange={e=>setSubject3(e.target.value)}
           />
           
           <label htmlFor="subject">Select a Subject1:</label>
           <div className="subjectOptions">
             <label>
               <input
                 type="radio"
                 name="subject"
                 value="subject1"
                 checked={subject1 === "subject1"}
                 onChange={handleSubjectChange}
               />
               Subject 1
             </label>
             <label>
               <input
                 type="radio"
                 name="subject"
                 value="subject2"
                 checked={subject1=== "subject2"}
                 onChange={handleSubjectChange}
               />
               Subject 2
             </label>
             <label>
               <input
                 type="radio"
                 name="subject"
                 value="subject3"
                 checked={subject1 === "subject3"}
                 onChange={handleSubjectChange}
               />
               Subject 3
             </label>
            </div>
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

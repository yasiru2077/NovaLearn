import axios from 'axios';
import React, { useState } from 'react'

function PrimaryRegister() {
    const [username,setUsername]=  useState("");
    const [email,setEmail]= useState("");
    const [role,setRole]= useState("");
    const [StId,setStId]= useState("");
    const [st_class,setSt_class]= useState("");
    const [grade,setGrade]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError(false);
        try{
            const res=await axios.post("/primarystudents/register",{
              username,
              email,
              role:"3",
              StId,
              st_class,
              grade,
              password,

            });
            
            res.data && window.location.replace("/login");
          }catch(err){
            setError(true)
        }
      };

      const handleGradeChange = (e) => {
        setGrade(e.target.value); // Update the grade state with the selected value
      };
    
  return (
   <div className='flex justify-center dark:bg-gray-900'>
    <form className="w-full max-w-lg  dark:bg-gray-900" onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Full Name
      </label>
      <input
      onChange={e=>setUsername(e.target.value)}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
   
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase  text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Index Number
      </label>
      <input 
        onChange={e=>setStId(e.target.value)}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="31435615464"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase  text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input 
        onChange={e=>setPassword(e.target.value)}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
  
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
      <label className="block uppercase  text-gray-700 text-xs font-bold mb-2" for="grid-password">
        email
      </label>
      <input 
      onChange={e=>setEmail(e.target.value)}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="133*aea@gmail.com"/>
  
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase  text-gray-700 text-xs font-bold mb-2" for="grid-city">
        role
      </label>
      <input 
        onChange={e=>setRole(e.target.value)}
      value={3} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="3"/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Grade
      </label>
    
      <div className="relative">
        <select 
         value={grade}
         onChange={handleGradeChange}
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option value="">Select a grade</option>
          <option value="1"> Grade 1</option>
          <option value="2"> Grade 2</option>
          <option value="3"> Grade 3</option>
          <option value="4"> Grade 4</option>
          <option value="5"> Grade 5</option>
        </select>
     
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Class
      </label>
      <input 
      onChange={e=>setSt_class(e.target.value)}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="eg:1A"/>
    </div>
   </div>
   <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  
</form>
   </div>
  )
}

export default PrimaryRegister
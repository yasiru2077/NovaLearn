import axios from 'axios';
import React, { useState } from 'react'
import AdminNavBar from '../../components/adminnavbar/AdminNavBar';

export default function TeachersRegister() {
  const [username,setUsername]=  useState("");
  const [email,setEmail]= useState("");
  const [role,setRole]=  useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(false);
  
  
  return (
    <div>
    <AdminNavBar/>
  
   </div>
  )
}

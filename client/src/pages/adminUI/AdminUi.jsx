import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../components/adminnavbar/AdminNavBar'
import AdminDash from '../../components/adminDash/AdminDash'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function AdminUi() {
  const [users,setUsers]=useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
 
        const res = await axios.get("/users");
        setUsers(res.data);
        
     
    }

    fetchUsers()
  }, []);

  return (
    <>
     <div>
        <AdminNavBar/>
        <AdminDash users={users}/>
    </div>
    </>
   
  )
}

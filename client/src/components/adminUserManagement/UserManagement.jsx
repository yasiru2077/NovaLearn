import React, { useEffect } from 'react'
import './UserManagement.css'
import axios from 'axios';
export default function UserManagement({user}) {

    const handleDelete = async () => {
        try {
          const userId = user._id;
          console.log(userId);
          await axios.delete(`/users/${user._id}`);
          window.location.replace("/login");
        } catch (err) {
            console.error('Error deleting user:', err);
        }
      };

    let crudrole
    if(user.role==="1"){
        crudrole="admin";
    }else if(user.role==="2"){
        crudrole="Teacher";
    }else if(user.role==="3"){
        crudrole="Student";
    }

  return (
   
    <div className="singleUser">

        
       
        <div className="userdetails">
        <h3>{user.username}</h3>
        <h3>{crudrole}</h3>
        <h3>{user.email}</h3>
        <i className="delete fa-solid fa-trash" onClick={handleDelete}></i>

        </div>
       

    </div>
  )
}

import { useContext, useRef } from 'react';
import './login.css';
import { Context } from '../../context/Context';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {

  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch, isFetching}=useContext(Context)

  const handleSubmit =async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      const userRole = res.data.role;
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };
  
  return (
   
    <div className='login'>
   
       
        <form action="" className="loginForm" onSubmit={handleSubmit}>
            
            <div>
            <div>
            <h1>WELCOME BACK!</h1>
            <p>Don't have a account, Sign up</p>
           
            </div>
            <label htmlFor="username" ></label>
            <input type="text" className="username" placeholder='Username' 
            ref={userRef}
            />
            <label htmlFor="password"></label>
            <input type="password" className="password" placeholder='Password'
            ref={passwordRef}
            />
            <button className='loginButton2' type='submit' disabled={isFetching}>LOGIN</button>
            </div>
            <img className='' src="./images/Image.png" alt="" />
           
           
        </form>
      
       
    </div>
    
  )
}


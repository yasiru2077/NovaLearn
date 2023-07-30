import './login.css';

export default function Login() {
  return (
    <div className='login'>
       
        <form action="" className="loginForm">
            <img className='' src="./images/Web 1920 .png" alt="" />
            <label htmlFor="username" ></label>
            <input type="text" className="username" placeholder='Username' />
            <label htmlFor="password"></label>
            <input type="password" className="password" placeholder='Password'/>
            <button className='loginButton2'>LOGIN</button>
            <a href="{}">Don't Have Access Yet?</a>
        </form>
      
       
    </div>
  )
}


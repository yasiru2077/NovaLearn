import { Link } from 'react-router-dom';
import './welcome.css';


export default function Welcome() {
  return (
    <div className='welcome'>
        <div className="loginNav">
            <a href="{#}"><img src="./images/web.png" alt="" /></a>
            <Link to="/login">
            <button className='loginButton'>
                LOG IN
            </button>
            
            </Link>
           
        </div>
       <div className='welcomeCon'>
       <div>
       <span><span className="brandname">EXPAND</span> MINDS EMPOWER GROWTH
        WITH <span className='brandname'>EDULANKA</span> </span> 
        <button className="requestButton">REQUEST</button>
       </div>
        <img className='welcomeConImg' src="./images/5t8l4bvh0re8a269254tbtnbe1.png" alt="" />
       </div>
       
        <div className='lms_guide1'>
            GUIDE FOR PRODUCTIVITY
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sit sunt obcaecati voluptates aperiam. <br /> Quae, mollitia beatae similique nemo dolorem quis. Aliquam officia expedita magnam iure voluptas assumenda ipsam atque.</p>
            <div>
            
            <div>
               <span className='teacher'>Teachers</span> 
                <p>Outstanding features for highly customizable <br /> Courses, Units, Lessons, and Quizzes</p>
            </div>
            <div>
            <span className='students'>Students</span> 
                <p>Outstanding features for highly customizable <br /> Courses, Units, Lessons, and Quizzes</p>
            </div>
            </div>
            
        </div>

    </div>

  )
}

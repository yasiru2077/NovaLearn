import { Link } from 'react-router-dom';
import './teacherquizsidebar.css';

export default function TeachersQuizSideBar(quiz) {
  return (
    <div className='AdminSideBar'>
        <div className="sidebar">
        
        <div> grade 6</div>
        <Link className='sidelink' to="/quizReview">
            
        review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>
       
       <div>grade 7</div>
        <Link to="/quizReview">
            review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>
       <div>grade 8</div>
        <Link to="/quizReview">
            review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>
        
       <div>grade 9</div>
        <Link to="/quizReview">
            review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>
       <div>grade 10</div>
        <Link to="/quizReview">
            review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>
       <div>grade 11</div>
        <Link to="/quizReview">
            review qustions
        </Link>
       <Link to="/addQustion">
       add qustions
       </Link>


        </div>
       
      
        
      
    </div>
  )
}

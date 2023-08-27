import { Link } from 'react-router-dom';
import './teacherquizsidebar.css';

export default function TeachersQuizSideBar(quiz) {
  return (
    <div className='teachersSideNav'>TeachersQuizSideBar
        <ul>
            grade 6
        <Link to="/quizReview">
        <li>review qustions</li>
        </Link>
       <Link to="/addQustion">
       <li>add qustions</li>
       </Link>
       
        </ul>
        <ul>
        grade 7
        <li>review qustions</li>
        <li>add qustions</li>
        </ul>
        <ul>
        grade 8
        <li>review qustions</li>
            <li>add qustions</li>
        </ul>
        <ul>
        grade 9
        <li>review qustions</li>
            <li>add qustions</li>
        </ul>
        <ul>
        grade 10
        <li>review qustions</li>
            <li>add qustions</li>
        </ul>
        <ul>
        grade 11
        <li>review qustions</li>
        <li>add qustions</li>
        </ul>
    </div>
  )
}

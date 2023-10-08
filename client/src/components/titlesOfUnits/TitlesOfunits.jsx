import { Link } from 'react-router-dom'
import './TitlesOfunits.css'

export default function TitlesOfunits({quiz}) {
  return (
    <div className='TitlesOfunits'>
      <Link className='quizTitleNames' to={`/quizReview/${quiz.title}`}>
      <i className="math fa-solid fa-xmark"></i>
      {quiz.title}
      </Link>
     
      
    </div>
  )
}

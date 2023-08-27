import { Link } from 'react-router-dom'
import './TitlesOfunits.css'

export default function TitlesOfunits({quiz}) {
  return (
    <div className='TitlesOfunits'>
      <Link to={`/quizReview/${quiz.title}`}>
      {quiz.title}
      </Link>
     
      
    </div>
  )
}

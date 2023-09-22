import React from 'react'
import TeacherNav from '../../components/teachersNavBar/TeacherNav'
import TeachersQuizSideBar from '../../components/sidebar/adminsidebar/teachersQuizSidebar/TeachersQuizSideBar'
import Quizes from '../../components/quizes/Quizes'



export default function QustionReview() {
  return (
    <div>
        <TeacherNav/>
        <TeachersQuizSideBar/>
        <Quizes/>
      
    </div>
  )
}

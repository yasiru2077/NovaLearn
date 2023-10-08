import React, { useEffect, useState } from 'react'
import TeacherNav from '../teachersNavBar/TeacherNav'
import TeacherDash from '../teacherDash/TeacherDash'
import TeachersQuizSideBar from '../sidebar/adminsidebar/teachersQuizSidebar/TeachersQuizSideBar'

export default function Quiz() {


  return (
    <div>
        <TeacherNav/>
        <TeachersQuizSideBar/>
       
    </div>
  )
}

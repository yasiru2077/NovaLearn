import React from 'react'
import TeacherNav from '../../components/teachersNavBar/TeacherNav'
import TeacherDash from '../../components/teacherDash/TeacherDash'
import EventsViewer from '../eventViewer/EventsViewer'
import TeachersNavBar2 from '../../components/teachersnavbar2/TeachersNavBar2'

export default function TeacherUI() {
  return (
    <div>
      <TeachersNavBar2/>
      <EventsViewer/>
    </div>
  )
}

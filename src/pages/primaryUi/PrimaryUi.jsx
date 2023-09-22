import React, { useContext } from 'react'
import PrimaryNavBar from '../../components/primarynavbar/PrimaryNavBar'
import PrimaryWelcome from '../primarywelcome/PrimaryWelcome'
import { Context } from '../../context/Context';
import SecondryUi from '../SecondryUi/SecondryUi';
import SecondaryNav from '../../components/SecondaryNav/SecondaryNav';

export default function PrimaryUi() {
  const {user}=useContext(Context);


  const grade = user?.grade;
  const studentsGrade = parseInt(grade);
  let elementNav;
  if(studentsGrade< 6){
    elementNav = <PrimaryNavBar/>
  }else if(studentsGrade>5){
    elementNav = <SecondaryNav/>
  }
  return (
    <>
    
    {elementNav}
    <div>
        
        <PrimaryWelcome/>
    </div>
    </>
  )
}

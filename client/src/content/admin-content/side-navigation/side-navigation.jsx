import React from "react";
import lecturerIcon from "../../../assets/teacher-svgrepo-com (1).svg";
import studentIcon from "../../../assets/student-svgrepo-com.svg";
import "./side-navigation.css"

function SideNavigation() {
  return (
    <div className="side-navigation">
      <li><img className="lecturer-icon" src={lecturerIcon} alt="" /></li>
      <li><img className="student-icon" src={studentIcon} alt="" /></li>
    </div>
  );
}

export default SideNavigation;

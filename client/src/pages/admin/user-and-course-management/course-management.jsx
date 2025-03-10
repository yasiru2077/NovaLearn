import React, { useState } from "react";
import "./course-management.jsx";
import { Link } from "react-router-dom";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  
  return (
    <div>
      <h1>
        <Link to={`/course-management`}>Course Management</Link>/
        <Link to={`/user-management`}>User Management</Link>
      </h1>
    </div>
  );
}

export default CourseManagement;

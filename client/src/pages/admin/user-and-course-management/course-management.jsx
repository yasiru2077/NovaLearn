import React, { useEffect, useState } from "react";
import "./course-management.jsx";
import { Link } from "react-router-dom";
import AddCourse from "../../../content/admin-content/course-management/add-course.jsx";
import UpdateCourse from "../../../content/admin-content/course-management/update-course.jsx";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [error, setError] = useState();
  const [deleteMessage, setDeleteMessage] = useState();

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure want to delete this course")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/courses/delete/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status: ${response.status}`);
      }

      setDeleteMessage("Course successfully deleted");
      fetchCourses();

      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  const fetchCourses = () => {
    setLoading(true);

    fetch("http://localhost:3000/api/courses/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error Status:${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUpdateAndAdd = () => {
    fetchCourses();
  };

  return (
    <main>
      <h1>
        <Link to={`/course-management`}>Course Management</Link>/
        <Link to={`/user-management`}>User Management</Link>
      </h1>
      <div>
        <AddCourse onUpdateAndAdd={handleUpdateAndAdd} />
      </div>
      <div>
        <UpdateCourse
          onUpdateAndAdd={handleUpdateAndAdd}
          courses={courses}
          editingCourseId={editingCourseId}
        />
      </div>
      <div>
        {courses.map((courses) => (
          <div key={courses.id}>
            <h2>{courses.id}</h2>
            <p>{courses.title}</p>
            <p>{courses.description}</p>
            <p>{courses.lecturer_name}</p>
            <button onClick={() => setEditingCourseId(courses.id)}>Edit</button>
            <button onClick={() => handleDelete(courses.id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CourseManagement;

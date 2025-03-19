import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DiscussionForum from "../../../content/teacher-content/discussion/discussion-forum.jsx";
import "./DiscussionPage.css";

function DiscussionPage({ userDetails }) {
  const [courseId, setCourseId] = useState();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseDetails = async () => {
    if (!courseId) return; // Avoid making an invalid request

    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/${courseId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      setCourseDetails(response.data);
    } catch (err) {
      setError("Failed to load course details");
      console.error("Error fetching course details:", err);
    } finally {
      setLoading(false);
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
          throw new Error(`HTTP error Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("All Courses", data);

        // Filter courses by lecturer_id
        const filteredCourses = data.filter(
          (course) => course.lecturer_id === userDetails.id
        );
        console.log("Lecturer Courses", filteredCourses);

        // Extract course IDs
        const courseIds = filteredCourses.map((course) => course.id);
        // Store the filtered courses in state
        setCourseId(courseIds[0]);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // const fetchCourseDetails = async () => {};

  useEffect(() => {
    fetchCourseDetails();
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="discussion-page">
      {courseDetails && (
        <div className="course-header">
          <h1>{courseDetails.title}</h1>
          <p className="course-description">{courseDetails.description}</p>
        </div>
      )}

      <DiscussionForum courseId={courseId} userDetails={userDetails} />
    </div>
  );
}

export default DiscussionPage;

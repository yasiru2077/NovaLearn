import axios from "axios";
import React, { useEffect, useState } from "react";
import AddAnnouncement from "../../../content/teacher-content/announcement/add-announcement";
import UpdateAnnouncement from "../../../content/teacher-content/announcement/update-announcement";
import "./announcement.css";

function AnnouncementLecturer({ userDetails }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [lecturerId, setLecturerId] = useState(null);
  const [lecturerDetails, setLecturerDetails] = useState(null);
  const [announcementId, setAnnouncementId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState();

  useEffect(() => {
    // Check if lecturerDetails exists and has at least one item
    if (lecturerDetails && lecturerDetails.length > 0) {
      // Extract id and lecturer_id from the first item
      const { id, lecturer_id } = lecturerDetails[0];

      // Store them in separate variables
      setCourseId(id);
      setLecturerId(lecturer_id);

      // You can also log them to verify
      console.log("Course ID:", id);
      console.log("Lecturer ID:", lecturer_id);
    }
  }, [lecturerDetails]);

  const fetchAnnouncement = () => {
    fetch("http://localhost:3000/api/announcements/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || `HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        console.log("All Announcement:", data);

        const filteredAnnouncement = data.filter(
          (announcements) => announcements.lecturer_id === userDetails.id
        );
        setAnnouncements(filteredAnnouncement);
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
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
        console.log("All Courses", data);

        // Filter courses by lecturer_id
        const filteredCourses = data.filter(
          (course) => course.lecturer_id === userDetails.id
        );
        console.log("Lecturer Courses", filteredCourses);

        // Store the filtered courses in state
        //   setLecturerCourses(filteredCourses);

        setLecturerDetails(filteredCourses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnnouncement();
    fetchCourses();
  }, [userDetails.id]);

  const handleDelete = async (announcementId) => {
    if (!window.confirm("Are you sure want to delete this Announcement?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/announcements/${announcementId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lecturer_id: userDetails.id }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! Status: ${response.status}`
        );
      }

      setDeleteMessage("Announcement removed successfully");
      fetchAnnouncement();

      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error deleting Announcement:", error);
      setError(error.message);
    }
  };

  return (
    <main className="announcement-lec">
      <h1>Your Announcements</h1>

      <div>
        <AddAnnouncement
          lecturerId={lecturerId}
          courseId={courseId}
          lecturerDetails={lecturerDetails}
          fetchAnnouncement={fetchAnnouncement}
        />
      </div>

      <div>
        <UpdateAnnouncement
          lecturerId={lecturerId}
          courseId={courseId}
          announcementId={announcementId}
          announcements={announcements}
          fetchAnnouncement={fetchAnnouncement}
        />
      </div>

      <div>{/* <update/> */}</div>

      <div className="announcement-container">
        {announcements.length === 0 ? (
          <p>No announcements found</p>
        ) : (
          <div>
            {announcements.map((announcement) => (
              <div key={announcement.id}>
                <p>{announcement.message}</p>
                <p>{announcement.lecturer_name}</p>
                <p>{new Date(announcement.posted_at).toLocaleDateString()}</p>
                <button onClick={() => setAnnouncementId(announcement.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(announcement.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AnnouncementLecturer;

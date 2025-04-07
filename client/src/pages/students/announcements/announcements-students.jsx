import React, { useEffect, useState } from "react";

function AnnouncementsStudents({ userDetails }) {
  const [announcements, setAnnouncements] = useState([]);
  const [enrollment, setEnrollment] = useState(null); // Initialize as null, not empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First fetch enrollments, then fetch announcements only after we have enrollment data
  useEffect(() => {
    fetchEnrollment();
  }, []);

  // Second useEffect that runs when enrollment changes
  useEffect(() => {
    if (enrollment && enrollment.course_id) {
      fetchAnnouncements();
    }
  }, [enrollment]);

  const fetchAnnouncements = () => {
    fetch("http://localhost:3000/api/announcements/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        // Now filter announcements based on the enrollment course_id
        const filteredAnnouncements = data.filter(
          (announcement) => announcement.course_id === enrollment.course_id
        );

        setAnnouncements(filteredAnnouncements);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setError("Failed to load announcements. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchEnrollment = () => {
    fetch("http://localhost:3000/api/enrollment/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        const filteredEnrollments = data.filter(
          (e) => e.student === userDetails.username
        );

        if (filteredEnrollments.length > 0) {
          setEnrollment(filteredEnrollments[0]);
        } else {
          console.log("No enrollments found for this student");
        }
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
        setError("Failed to load enrollments. Please try again later.");
      })
      .finally(() => {
        if (!enrollment) setLoading(false);
      });
  };

  console.log(announcements);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      {announcements.length > 0 ? (
        <ul className="announcements-list">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="announcement-item">
              <p>{announcement.message}</p>
              <p>{announcement.lecturer_name}</p>
              <small>
                Posted on:{" "}
                {new Date(announcement.posted_at).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements found.</p>
      )}
    </div>
  );
}

export default AnnouncementsStudents;

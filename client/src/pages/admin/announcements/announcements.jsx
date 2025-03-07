import React, { useEffect, useState } from "react";

function Announcements() {
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // http://localhost:3000/api/courses/all
  // http://localhost:3000/api/announcements/all

  console.log(course);
  

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/api/announcements/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        console.log("Announcement data:", data);

        setAnnouncements(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setError(error.message);
        // setLoading(false);
      });

    fetch("http://localhost:3000/api/courses/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();

        console.log("Course data:", data);

        setCourse(data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>loading ...</div>;
  if (error) return <div>error:{error}</div>;

  return (
    <section>
      {announcements.map((announcement) => {
        // Find the course that matches the announcement's course_id
        const courses = course.find((c) => c.id === announcement.course_id);
        return (
          <div key={announcement.id}>
            <h2>{courses ? courses.title : announcement.course_id}</h2>
            <p>Lecturer: {announcement.lecturer_name}</p>
            <p>{announcement.message}</p>
            <p>{new Date(announcement.posted_at).toLocaleString()}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Announcements;

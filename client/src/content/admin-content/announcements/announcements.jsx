import React, { useEffect, useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // http://localhost:3000/api/courses/all
  // http://localhost:3000/api/announcements/all

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/api/courses/all")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();

        console.log("Announcements data:", data);

        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return <div>Announcements</div>;
}

export default Announcements;

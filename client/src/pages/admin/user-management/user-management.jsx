import React, { useEffect, useState } from "react";

function UserManagement() {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/api/user-management/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        console.log("all users:", data);

        setAllCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>loading ...</div>;
  if (error) return <div>error:{error}</div>;

  return (
    <section>
      {allCourses.map((courses) => {
        return (
          <div key={courses.id}>
            <p>{courses.id}</p>
            <p>{courses.username}</p>
            <p>{courses.email}</p>
            <p>{courses.role}</p>
            <p>update</p>
            <p>delete</p>
          </div>
        );
      })}
    </section>
  );
}

export default UserManagement;

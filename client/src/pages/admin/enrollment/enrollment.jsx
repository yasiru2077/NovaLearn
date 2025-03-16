import React, { useEffect, useState } from "react";
import AddEnrollments from "../../../content/admin-content/enrollments/add-enrollments";
import UpdateCourse from "../../../content/admin-content/course-management/update-course";
import UpdateEnrollments from "../../../content/admin-content/enrollments/update-enrollments";

function Enrollment() {
  const [enrollment, setEnrollment] = useState([]);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [deleteMessage, setDeleteMessage] = useState();

  const fetchEnrollments = () => {
    setLoading(true);

    fetch("http://localhost:3000/api/enrollment/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || `HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setEnrollment(data);
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDelete = async (enrollemtId) => {
    if (!window.confirm("Are you sure want to delete this enrollment?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/api/enrollment/${enrollemtId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status:${response.status}`);
      }
      setDeleteMessage("Enrollment removed successfully");
      fetchEnrollments();

      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      setError(error.message);
    }
  };

  return (
    <main>
      <div>
        <AddEnrollments />
      </div>
      <div>
        <UpdateEnrollments
          enrollment={enrollment}
          editingEnrollmentId={editingEnrollmentId}
          fetchEnrollments={fetchEnrollments}
        />
      </div>
      <div>
        {enrollment.map((enrollment) => (
          <div key={enrollment.id}>
            <h2>{enrollment.id}</h2>
            <p>{enrollment.student}</p>
            <p>{enrollment.course}</p>
            <p>
              {new Date(enrollment.enrolled_at).toLocaleDateString("en-US")}
            </p>
            <button onClick={() => setEditingEnrollmentId(enrollment.id)}>
              edit
            </button>
            <button onClick={() => handleDelete(enrollment.id)}>delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Enrollment;

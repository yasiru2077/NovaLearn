import React, { useState } from "react";
import { useEffect } from "react";

function UpdateEnrollments({
  editingEnrollmentId,
  enrollment,
  fetchEnrollments,
}) {
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    const enrollmentData = enrollment.find((e) => e.id === editingEnrollmentId);


    console.log("rec:", enrollmentData);
    // console.log(enrollmentData.student_id);
    
    if (!enrollmentData) {
      setError("Enrollemnt not found");
      setFormData({ student_id: "", course_id: "" });
      return;
    }

    setError(null);

    setFormData({
      student_id: enrollmentData.student_id || "",
      course_id: enrollmentData.course_id || "",
    });
  }, [editingEnrollmentId, enrollment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/enrollment/update/${editingEnrollmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status:${response.status}`);
      }

      fetchEnrollments();
    } catch (error) {
      console.error("Error updating enrollment:", error);
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section>
      <h2>UpdateEnrollments</h2>

      {error && <div>Error:{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="student_id">Student Id:</label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="course_id">Course Id:</label>
          <input
            type="text"
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={updating}>
          {updating ? "Editing..." : "Edit Courses"}
        </button>

        <button type="button" disabled={updating}>
          Cancel
        </button>
      </form>
    </section>
  );
}

export default UpdateEnrollments;

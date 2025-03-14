import React, { useState } from "react";

function AddEnrollments() {
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:3000/api/enrollment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status:${response.status}`);
      }

      setSuccess("Enrollment has been successfully created!");
      setFormData({
        student_id: "",
        course_id: "",
      });
    } catch (error) {
      console.error("Error adding enrollment:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>AddEnrollments</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Enrolling" : "Enroll"}
        </button>
        <button>Cancel</button>
      </form>
    </section>
  );
}

export default AddEnrollments;

import React, { useState } from "react";

function AddCourse({ onUpdateAndAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lecturer_id: "",
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
      const response = await fetch("http://localhost:3000/api/courses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status: ${response.status}`);
      }

      setSuccess("Course has been successfully created!");
      setFormData({
        title: "",
        description: "",
        lecturer_id: "",
      });

      onUpdateAndAdd();
    } catch (error) {
      console.error("Error adding course:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AddCourse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Course Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lecturer_id">Lecturer Id:</label>
          <input
            type="number"
            name="lecturer_id"
            value={formData.lecturer_id}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Courses"}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;

import React, { useEffect, useState } from "react";

function UpdateCourse({ editingCourseId, courses, onUpdateAndAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lecturer_id: "",
  });
  // const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(courses);

  console.log(editingCourseId);

  useEffect(() => {
    const coursesData = courses.find((course) => course.id === editingCourseId);

    if (!coursesData) {
      setError("Course not found");
      return;
    }

    setFormData({
      title: coursesData.title,
      description: coursesData.description,
      lecturer_id: coursesData.lecturer_id,
    });
  }, [editingCourseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/courses/update/${editingCourseId}`,
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

      onUpdateAndAdd();
    } catch (error) {
      console.error("Error updating course:", error);
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <div className="error-message">Error: {error}</div>}
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

        <button type="submit" disabled={updating}>
          {updating ? "Editing..." : "Edit Courses"}
        </button>

        <button type="button" disabled={updating}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateCourse;

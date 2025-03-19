import React, { useState, useEffect } from "react";

function AddAnnouncement({
  lecturerDetails,
  lecturerId,
  courseId,
  fetchAnnouncement,
}) {
  const [formData, setFormData] = useState({
    course_id: courseId || "",
    lecturer_id: lecturerId || "",
    message: "",
  });

  // Update formData when props change

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      course_id: courseId || "",
      lecturer_id: lecturerId || "",
    }));
  }, [courseId, lecturerId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("Form Data:", formData); // Debug to verify data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate that required fields are present
    if (!formData.course_id || !formData.lecturer_id || !formData.message) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/announcements/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess("Announcement has been successfully posted!");

      // Reset only the message field after successful submission
      setFormData({
        ...formData,
        message: "",
      });

      fetchAnnouncement();
    } catch (error) {
      console.error("Error adding announcement:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Announcement</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Hidden fields for course_id and lecturer_id */}
        <input type="hidden" name="course_id" value={formData.course_id} />
        <input type="hidden" name="lecturer_id" value={formData.lecturer_id} />

        <div>
          <label htmlFor="message">Announcement:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Announcement"}
        </button>
      </form>
    </div>
  );
}

export default AddAnnouncement;

import React, { useEffect, useState } from "react";

function UpdateAnnouncement({
  lecturerId,
  courseId,
  announcementId,
  announcements,
  fetchAnnouncement,
}) {
  const [formData, setFormData] = useState({
    course_id: courseId || "",
    lecturer_id: lecturerId || "",
    message: "",
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update course_id and lecturer_id when props change
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      course_id: courseId || "",
      lecturer_id: lecturerId || "",
    }));
  }, [courseId, lecturerId]);

  // Load announcement data when announcementId or announcements change
  useEffect(() => {
    // Check if announcements array exists and is not empty
    if (announcements && announcements.length > 0 && announcementId) {
      const announcementData = announcements.find(
        (e) => e.id === announcementId
      );

      // Only update state if announcement is found
      if (announcementData) {
        console.log("Found announcement:", announcementData);
        setFormData((prevState) => ({
          ...prevState,
          message: announcementData.message || "",
        }));
      } else {
        console.error("Announcement not found with ID:", announcementId);
        setError("Announcement not found");
      }
    }
  }, [announcementId, announcements]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate data
      if (!formData.course_id || !formData.lecturer_id || !formData.message) {
        throw new Error("All fields are required");
      }

      const response = await fetch(
        `http://localhost:3000/api/announcements/${announcementId}`,
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
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess("Announcement updated successfully!");
      fetchAnnouncement();
    } catch (error) {
      console.error("Error updating announcement:", error);
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section>
      <h2>Update Announcement</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Announcement"}
        </button>
      </form>
    </section>
  );
}

export default UpdateAnnouncement;

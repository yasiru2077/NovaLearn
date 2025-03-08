import React, { useState, useEffect } from "react";

function UpdateUser({ userId, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user-management/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const allUsers = await response.json();
        const userData = allUsers.find(user => user.id === userId);
        
        if (!userData) {
          throw new Error("User not found");
        }

        setFormData({
          username: userData.username,
          email: userData.email,
          role: userData.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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

    try {
      const response = await fetch(`http://localhost:3000/api/user-management/update/${userId}`, {
        method: "PUT",
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

      // Call the onUpdate callback to inform parent component
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error && !updating) return <div>Error loading user: {error}</div>;

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      {error && <div className="error-message">Error: {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="button-group">
          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update User"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={updating}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
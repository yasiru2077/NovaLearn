import React, { useEffect, useState } from "react";
import AddUser from "../../../content/admin-content/user-management/add-user.jsx";
import UpdateUser from "../../../content/admin-content/user-management/update-user.jsx";
import SideNavigation from "../../../content/admin-content/side-navigation/side-navigation.jsx";
import "./user-management.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  // const [allStudent, setAllStudent] = useState([]);
  // const [allLecturer, setAllLecturer] = useState([]);

  const allStudent = users.filter((user) => user.role === "student");
  const allLecturer = users.filter((user) => user.role === "lecturer")

  

  const fetchUsers = () => {
    setLoading(true);

    fetch("http://localhost:3000/api/user-management/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/user-management/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || `HTTP error! Status: ${response.status}`);
      }

      setDeleteMessage("User successfully deleted");
      // Refresh the user list
      fetchUsers();

      // Clear message after 3 seconds
      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  const handleAddUserSuccess = () => {
    setShowAddForm(false);
    fetchUsers();
  };

  const handleUpdateSuccess = () => {
    setEditingUserId(null);
    fetchUsers();
  };

  if (loading && users.length === 0) return <div>Loading...</div>;
  if (error && users.length === 0) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <main className="user-management-container">
        <section>
          <SideNavigation />
        </section>
        <section>
          <h1>User Management</h1>
          {deleteMessage && (
            <div className="success-message">{deleteMessage}</div>
          )}
          {error && <div className="error-message">Error: {error}</div>}

          {!showAddForm && !editingUserId && (
            <button
              className="add-user-button"
              onClick={() => setShowAddForm(true)}
            >
              Add New User
            </button>
          )}

          {showAddForm && (
            <div className="form-container">
              <AddUser onSuccess={handleAddUserSuccess} />
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          )}

          {editingUserId && (
            <div className="form-container">
              <UpdateUser
                userId={editingUserId}
                onUpdate={handleUpdateSuccess}
                onCancel={() => setEditingUserId(null)}
              />
            </div>
          )}

          <h2>User List</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="user-list">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => setEditingUserId(user.id)}
                          disabled={editingUserId !== null}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </React.Fragment>
  );
}

export default UserManagement;

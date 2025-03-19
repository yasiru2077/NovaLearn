import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./DiscussionForum.css"; 

function DiscussionForum({ courseId, userDetails }) {
  const [discussions, setDiscussions] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    fetchDiscussions();
  }, [courseId]);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/discussions/all`,
        {
          params: { course_id: courseId },
          withCredentials: true,
        }
      );
      setDiscussions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load discussions");
      console.error("Error fetching discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        "http://localhost:3000/api/discussions/add",
        {
          course_id: courseId,
          user_id: userDetails.id,
          message: newMessage.trim(),
        },
        { withCredentials: true }
      );

      setNewMessage("");
      setStatusMessage("Message sent successfully!");
      fetchDiscussions();

      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
      console.error("Error sending message:", err);
    }
  };

  const handleEdit = (discussion) => {
    setEditingId(discussion.id);
    setEditMessage(discussion.message);
  };

  const submitEdit = async () => {
    if (!editMessage.trim()) return;

    try {
      await axios.put(
        `http://localhost:3000/api/discussions/update/${editingId}`,
        {
          user_id: userDetails.id,
          message: editMessage.trim(),
        },
        { withCredentials: true }
      );

      setEditingId(null);
      setStatusMessage("Message updated successfully!");
      fetchDiscussions();

      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update message");
      console.error("Error updating message:", err);
    }
  };

  const handleDelete = async (discussionId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      await axios.delete(
        `http://localhost:3000/api/discussions/delete/${discussionId}`,
        {
          data: { user_id: userDetails.id },
          withCredentials: true,
        }
      );

      setStatusMessage("Message deleted successfully!");
      fetchDiscussions();

      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete message");
      console.error("Error deleting message:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  };

  return (
    <div className="discussion-forum">
      <h2>Discussion Forum</h2>

      {statusMessage && (
        <div className="status-message success">{statusMessage}</div>
      )}

      {error && <div className="status-message error">{error}</div>}

      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="3"
          required
        />
        <button type="submit" disabled={!newMessage.trim()}>
          Send Message
        </button>
      </form>

      <div className="discussions-container">
        {loading ? (
          <p>Loading discussions...</p>
        ) : discussions.length === 0 ? (
          <p>No discussions yet. Be the first to post!</p>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="discussion-item">
              {editingId === discussion.id ? (
                <div className="edit-form">
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows="3"
                  />
                  <div className="edit-buttons">
                    <button onClick={submitEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="discussion-header">
                    <span className="username">{discussion.username}</span>
                    <span className="timestamp">
                      {new Date(discussion.posted_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="message">{discussion.message}</p>
                  {userDetails.id === discussion.user_id && (
                    <div className="actions">
                      <button onClick={() => handleEdit(discussion)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(discussion.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DiscussionForum;

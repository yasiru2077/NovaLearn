// Assignments.js
import React, { useState, useEffect } from 'react';

const Assignments = ({ userDetails }) => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    course_id: '',
    title: '',
    description: '',
    assignment_details: '',
    due_date: ''
  });
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, [userDetails]);

  // Fetch lecturer's courses
  const fetchCourses = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/courses/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredCourses = data.filter(
          (course) => course.lecturer_id === userDetails.id
        );
        setCourses(filteredCourses);
        fetchAssignments(filteredCourses[0]?.id); // Fetch assignments for first course by default
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Fetch assignments for a specific course
  const fetchAssignments = (courseId) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/assignments/all?course_id=${courseId}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error Status: ${response.status}`);
        }
        const data = await response.json();
        setAssignments(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

  // Add new assignment
  const handleAddAssignment = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/assignments/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAssignment)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Assignment added successfully!") {
          fetchAssignments(newAssignment.course_id);
          setNewAssignment({
            course_id: '',
            title: '',
            description: '',
            assignment_details: '',
            due_date: ''
          });
        }
      })
      .catch(error => setError(error.message));
  };

  // Update assignment
  const handleUpdateAssignment = (id) => {
    fetch(`http://localhost:3000/api/assignments/update/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingAssignment)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Assignment updated successfully!") {
          fetchAssignments(editingAssignment.course_id);
          setEditingAssignment(null);
        }
      })
      .catch(error => setError(error.message));
  };

  // Delete assignment
  const handleDeleteAssignment = (id, courseId) => {
    fetch(`http://localhost:3000/api/assignments/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Assignment deleted successfully!") {
          fetchAssignments(courseId);
        }
      })
      .catch(error => setError(error.message));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assignments-container">
      <h2>Manage Assignments</h2>

      {/* Course Selection */}
      <select
        onChange={(e) => fetchAssignments(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select a course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      {/* Add Assignment Form */}
      <form onSubmit={handleAddAssignment}>
        <select
          name="course_id"
          value={newAssignment.course_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          value={newAssignment.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newAssignment.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <textarea
          name="assignment_details"
          value={newAssignment.assignment_details}
          onChange={handleInputChange}
          placeholder="Assignment Details"
          required
        />
        <input
          type="date"
          name="due_date"
          value={newAssignment.due_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Assignment</button>
      </form>

      {/* Assignments List */}
      <div className="assignments-list">
        {assignments.map(assignment => (
          <div key={assignment.id} className="assignment-item">
            {editingAssignment?.id === assignment.id ? (
              <>
                <input
                  value={editingAssignment.title}
                  onChange={(e) => setEditingAssignment({
                    ...editingAssignment,
                    title: e.target.value
                  })}
                />
                <textarea
                  value={editingAssignment.description}
                  onChange={(e) => setEditingAssignment({
                    ...editingAssignment,
                    description: e.target.value
                  })}
                />
                <textarea
                  value={editingAssignment.assignment_details}
                  onChange={(e) => setEditingAssignment({
                    ...editingAssignment,
                    assignment_details: e.target.value
                  })}
                />
                <input
                  type="date"
                  value={editingAssignment.due_date}
                  onChange={(e) => setEditingAssignment({
                    ...editingAssignment,
                    due_date: e.target.value
                  })}
                />
                <button onClick={() => handleUpdateAssignment(assignment.id)}>
                  Save
                </button>
                <button onClick={() => setEditingAssignment(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>Details: {assignment.assignment_details}</p>
                <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                <button onClick={() => setEditingAssignment(assignment)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(assignment.id, assignment.course_id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
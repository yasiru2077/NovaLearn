import axios from "axios";
import React, { useEffect, useState } from "react";
import "./student-container.css";

function StudentContent({ userDetails }) {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [assignmentId, setAssignmentId] = useState(null);
  const [singleAssignment, setSingleAssignment] = useState([]);

  const fileLink = "http://localhost:3000";

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/materials/all`,
        {
          withCredentials: true,
        }
      );

      const filteredMaterial = response.data.filter(
        (e) => e.course_id === enrollment.course_id
      );

      console.log(response.data);
      console.log(filteredMaterial);
      setMaterials(filteredMaterial);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load discussions");
      console.error("Error fetching discussions", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/assignments/all`,
        {
          withCredentials: true,
        }
      );

      const filteredAssignment = response.data.filter(
        (e) => e.course_id === enrollment.course_id
      );

      console.log(response.data);
      console.log(filteredAssignment);
      setAssignment(filteredAssignment);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load Assignments");
      console.error("Error fetching Assignments", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollment = () => {
    fetch("http://localhost:3000/api/enrollment/all", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        const filteredEnrollments = data.filter(
          (e) => e.student === userDetails.username
        );

        if (filteredEnrollments.length > 0) {
          setEnrollment(filteredEnrollments[0]);
        } else {
          console.log("No enrollments found for this student");
        }
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
        setError("Failed to load enrollments. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSingleAssignment = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/assignments/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setSingleAssignment(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load Assignments");
      console.error("Error fetching Assignments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, []);

  useEffect(() => {
    if (enrollment) {
      fetchMaterials();
      fetchAssignment();
    }
  }, [enrollment]);

  useEffect(() => {
    if (assignmentId) {
      fetchSingleAssignment(assignmentId);
    }
  }, [assignmentId]);

  const getFileExtension = (link) => {
    if (!link) return "";
    return link.split(".").pop().toLowerCase();
  };

  // Get icon based on file type
  const getFileIcon = (link, type) => {
    const ext = getFileExtension(link);

    if (type === "video") return "🎬";
    if (type === "audio") return "🔊";
    if (type === "presentation") return "📊";

    // Document types
    if (["pdf"].includes(ext)) return "📄";
    if (["doc", "docx"].includes(ext)) return "📝";
    if (["xls", "xlsx"].includes(ext)) return "📊";
    if (["ppt", "pptx"].includes(ext)) return "📑";
    if (["zip", "rar"].includes(ext)) return "📦";

    return "📄"; // Default
  };

  const handleOnClick = (assignmentId) => {
    setAssignmentId(assignmentId);
    console.log("assignment id:", assignmentId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fileInput = e.target.elements[0];
    if (!fileInput.files || fileInput.files.length === 0) {
      setError("Please select a file to upload");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("assignment_id", assignmentId);
    formData.append("student_id", userDetails.id || userDetails.username);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/submissions/add",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Assignment submitted successfully!");
      console.log("Submission response:", response.data);

      // Optionally reset the form or go back to the assignment list
      setTimeout(() => {
        setAssignmentId(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError(error.response?.data?.message || "Failed to submit assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {assignmentId && (
        <section>
          <div>
            <h3>{singleAssignment.title}</h3>
            <p>{singleAssignment.description}</p>
            <p>{singleAssignment.assignment_details}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="file" required />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit Assignment"}
            </button>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>
          <button
            onClick={() => {
              setAssignmentId(null);
            }}
          >
            Back
          </button>
        </section>
      )}
      {!assignmentId && (
        <React.Fragment>
          <div className="assignment">
            {assignment.map((assignment) => (
              <div
                onClick={() => {
                  handleOnClick(assignment.id);
                }}
                key={assignment.id}
              >
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>{assignment.assignment_details}</p>
                <p>
                  posted at:{new Date(assignment.created_at).toLocaleString()}
                </p>
                <p>due date:{new Date(assignment.due_date).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="material">
            {materials.map((material) => (
              <div key={material.id}>
                <h3>{material.title}</h3>
                <p>{material.material_type}</p>
                <div className="text-3xl mr-3">
                  {getFileIcon(material.material_link, material.material_type)}
                </div>
                <a
                  href={`${fileLink}${material.material_link}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Download
                </a>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default StudentContent;

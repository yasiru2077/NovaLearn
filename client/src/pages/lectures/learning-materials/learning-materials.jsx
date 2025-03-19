import React, { useState, useEffect } from "react";

const LearningMaterials = ({ userDetails }) => {
  // State variables
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    material_type: "document", // Default value
    file: null,
  });

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(null);

  // Fetch lecturer's courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch materials when selected course changes
  useEffect(() => {
    if (formData.course_id) {
      fetchMaterials(formData.course_id);
    }
  }, [formData.course_id]);

  // Fetch courses associated with the lecturer
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
        console.log("All Courses", data);

        // Filter courses by lecturer_id
        const filteredCourses = data.filter(
          (course) => course.lecturer_id === userDetails.id
        );
        console.log("Lecturer Courses", filteredCourses);

        setCourses(filteredCourses);

        // Set default course if available
        if (filteredCourses.length > 0) {
          setFormData((prev) => ({
            ...prev,
            course_id: filteredCourses[0].id,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Fetch materials for a specific course
  const fetchMaterials = (courseId) => {
    setLoading(true);

    fetch(`http://localhost:3000/api/materials/all?course_id=${courseId}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Materials:", data);
        setMaterials(data);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.course_id ||
      !formData.title ||
      !formData.material_type ||
      (!editMode && !formData.file)
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append("course_id", formData.course_id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("material_type", formData.material_type);

    // Only append file if it exists
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    const url = editMode
      ? `http://localhost:3000/api/materials/update/${currentMaterialId}`
      : "http://localhost:3000/api/materials/add";

    const method = editMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      credentials: "include",
      body: formDataToSend,
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");

        // Parse response based on content type
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
          throw new Error(
            isJson && data.message
              ? data.message
              : `HTTP error Status: ${response.status}`
          );
        }

        setSuccess(
          editMode
            ? "Material updated successfully!"
            : "Material added successfully!"
        );

        // Reset form but keep course_id
        setFormData({
          course_id: formData.course_id,
          title: "",
          material_type: "document",
          file: null,
        });

        // Reset file input
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
          fileInput.value = "";
        }

        // Exit edit mode
        if (editMode) {
          setEditMode(false);
          setCurrentMaterialId(null);
        }

        // Refresh materials list
        fetchMaterials(formData.course_id);
      })
      .catch((error) => {
        console.error("Error submitting material:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Handle edit material
  const handleEdit = (material) => {
    setEditMode(true);
    setCurrentMaterialId(material.id);
    setFormData({
      course_id: material.course_id,
      title: material.title,
      material_type: material.material_type,
      file: null, // File needs to be selected again if needed
    });

    // Scroll to form
    const formElement = document.getElementById("materialForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle delete material
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/materials/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          const isJson =
            contentType && contentType.includes("application/json");
          const errorData = isJson
            ? await response.json()
            : await response.text();

          throw new Error(
            isJson && errorData.message
              ? errorData.message
              : `HTTP error Status: ${response.status}`
          );
        }

        setSuccess("Material deleted successfully!");

        // Refresh materials list
        fetchMaterials(formData.course_id);
      })
      .catch((error) => {
        console.error("Error deleting material:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Get file extension from material link
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

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Learning Materials Management</h1>

      {/* Course Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Course:</label>
        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Success and Error Messages */}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* Material Form */}
      <div id="materialForm" className="bg-gray-50 p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? "Update Learning Material" : "Add New Learning Material"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Material Type:</label>
            <select
              name="material_type"
              value={formData.material_type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="presentation">Presentation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {editMode ? "Replace File (optional):" : "Upload File:"}
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required={!editMode}
            />
            {editMode && (
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep the current file
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : editMode
              ? "Update Material"
              : "Add Material"}
          </button>

          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setCurrentMaterialId(null);
                setFormData({
                  course_id: formData.course_id,
                  title: "",
                  material_type: "document",
                  file: null,
                });
                const fileInput = document.getElementById("fileInput");
                if (fileInput) fileInput.value = "";
              }}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Materials List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Materials</h2>

        {loading && <p>Loading materials...</p>}

        {!loading && materials.length === 0 && (
          <p className="text-gray-500">No materials found for this course.</p>
        )}

        {!loading && materials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((material) => (
              <div
                key={material.id}
                className="border rounded p-4 bg-white shadow-sm"
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-3">
                    {getFileIcon(
                      material.material_link,
                      material.material_type
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{material.title}</h3>
                    <p className="text-sm text-gray-600">
                      Type: {material.material_type}
                    </p>
                    <div className="mt-2">
                      <a
                        href={`http://localhost:3000${material.material_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mr-4"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-yellow-600 hover:underline text-sm mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterials;

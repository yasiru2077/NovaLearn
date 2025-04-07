import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login";
import NotFound from "./content/not-found";
import Layout from "./content/layout";
import Home from "./pages/home/home";
import Announcements from "./pages/admin/announcements/announcements";
import AdminContent from "./content/admin-content/admin-content";
import axios from "axios";
import UserManagement from "./pages/admin/user-and-course-management/user-management";
import Enrollment from "./pages/admin/enrollment/enrollment";
import CourseManagement from "./pages/admin/user-and-course-management/course-management";
import AnnouncementLecturer from "./pages/lectures/announcement-lecturer/announcement-lecturer";
import DiscussionPage from "./pages/lectures/discussion-page/discussion-page";
import LearningMaterials from "./pages/lectures/learning-materials/learning-materials";
import Assignments from "./pages/lectures/assignment/assignments";
import AnnouncementsStudents from "./pages/students/announcements/announcements-students";
import DiscussionStudents from "./pages/students/discussion/discussion-students";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const [isLoading, setIsLoading] = useState(true);
  console.log(isAuthenticated);

  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [isAuthenticated, userDetails]);

  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated) {
        try {
          // Create a simple endpoint to verify token validity
          const response = await axios.get(
            "http://localhost:3000/api/auth/verify",
            {
              withCredentials: true,
            }
          );
          // If the request succeeds, the token is valid
          setIsAuthenticated(true);
        } catch (error) {
          // If we get an error, the token is invalid/expired
          console.log("Authentication failed:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userDetails");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setUserDetails={setUserDetails}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            element={
              <Layout
                isAuthenticated={isAuthenticated}
                userDetails={userDetails}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route path="/" element={<Home userDetails={userDetails} />} />
            <Route path="/announcement" element={<Announcements />} />

            {userDetails && userDetails.role === "admin" ? (
              <React.Fragment>
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/enrollment" element={<Enrollment />} />
                <Route
                  path="/course-management"
                  element={<CourseManagement />}
                />
              </React.Fragment>
            ) : userDetails && userDetails.role === "lecturer" ? (
              <React.Fragment>
                <Route
                  path="/discussion"
                  element={<DiscussionPage userDetails={userDetails} />}
                />
                <Route
                  path="/mainAnnouncement"
                  element={<AnnouncementLecturer userDetails={userDetails} />}
                />
                <Route
                  path="/learning-materials"
                  element={<LearningMaterials userDetails={userDetails} />}
                />
                <Route
                  path="/assignmentAdd"
                  element={<Assignments userDetails={userDetails} />}
                />
              </React.Fragment>
            ) : userDetails && userDetails.role === "student" ? (
              <React.Fragment>
                <Route path="/" element={<Home userDetails={userDetails} />} />
                <Route
                  path="/announcementStudents"
                  element={<AnnouncementsStudents userDetails={userDetails} />}
                />
                <Route
                  path="/discussion"
                  element={<DiscussionStudents userDetails={userDetails} />}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/" element={<NotFound />} />
              </React.Fragment>
            )}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

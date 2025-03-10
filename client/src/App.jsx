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
import UserManagement from "./pages/admin/user-management/user-management";
import Enrollment from "./pages/admin/enrollment/enrollment";

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

            {userDetails.role ? (
              <React.Fragment>
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/enrollment" element={<Enrollment />} />
                {/* <Route path="/user-management" element={<UserManagement />} /> */}
              </React.Fragment>
            ) : (
              <NotFound />
            )}
          </Route>
        </Route>
        {/* <Route path="/" element={<AdminContent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

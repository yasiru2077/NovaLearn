import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Links, useActionData, useNavigate } from "react-router-dom";
import "./main-nav.css";
import NotFound from "../not-found";

function MainNavbar({ setIsAuthenticated, userDetails, isAuthenticated }) {
  const [user, setUser] = useState({
    username: userDetails.username,
    role: userDetails.role,
    email: userDetails.email,
  });

  console.log(userDetails);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");

      navigate("/login");
    } catch (err) {
      console.error("logout failed:", err.response?.data || err);
    }
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated]);

  return (
    <section className="main-nav-bar">
      <div>
        <h1 className="logo">[NOVALEARN]</h1>
      </div>
      <div className="page-links">
        {user.role === "admin" ? (
          <ul>
            <li>Home</li>
            <li>
              <Link to={`/announcement`}>Announcement</Link>
            </li>
            <li>
              <Link to={`/user-management`}> User Management</Link>
            </li>
            <li>Enrollments</li>
          </ul>
        ) : user.role === "lecturer" ? (
          <ul>
            <li>Home</li>
          </ul>
        ) : user.role === "student" ? (
          <ul>
            <li>Home</li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="logout-container">
        <ul>
          <div>
            <li className="user-name">{user.username}</li>
            <span className="role">{user.role}</span>
          </div>
          <li onClick={handleLogOut} style={{ cursor: "pointer" }}>
            logout
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MainNavbar;

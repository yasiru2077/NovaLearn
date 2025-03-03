import axios from "axios";
import React, { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./main-nav.css";
import NotFound from "../not-found";

function MainNavbar({ setIsAuthenticated, userDetails }) {
  const [user, setUser] = useState({
    username: userDetails.username,
    role: userDetails.role,
    email: userDetails.email,
  });

  console.log(userDetails);

  const navigate = useNavigate;

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

  return (
    <section>
      <div>
        <h1 className="logo">[NOVALEARN]</h1>
      </div>
      <div>
        {user.role === "admin" ? (
          <ul>
            <li>Home</li>
            <li>Announcements</li>
            <li>User Management</li>
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
          <NotFound />
        )}
      </div>
      <div>
        <ul>
          <ul>
            <li className="user-name">{user.username}</li>
            <span className="role">{user.role}</span>
          </ul>
          <li onClick={handleLogOut} style={{ cursor: "pointer" }}>
            logout
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MainNavbar;

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function MainNavbar({ setIsAuthenticated }) {
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
    <div>
      <li>Name</li>
      <li onClick={handleLogOut} style={{ cursor: "pointer" }}>
        logout
      </li>
    </div>
  );
}

export default MainNavbar;

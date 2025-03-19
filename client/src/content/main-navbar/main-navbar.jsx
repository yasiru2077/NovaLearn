import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Links, useActionData, useNavigate } from "react-router-dom";
import navIcon from "../../assets/menu-alt-1-svgrepo-com.svg";
// import navAfterIcon from "../../assets/menu-alt-svgrepo-com.svg";
import navAfterIcon from "../../assets/menu-alt-1-svgrepo-com (1).svg";
import "./main-nav.css";
import NotFound from "../not-found";

function MainNavbar({ setIsAuthenticated, userDetails, isAuthenticated }) {
  const [user, setUser] = useState({
    username: userDetails.username,
    role: userDetails.role,
    email: userDetails.email,
  });

  const [activateNav, setActivateNav] = useState(false);

  const handleNav = () => {
    setActivateNav(!activateNav);
  };

  console.log("userdetails:", userDetails);

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
    <React.Fragment>
      <section
        className={`mobile-nav ${activateNav ? "mobile-nav-drop-down" : ""}`}
      >
        <div className="mobile-nav-active">
          <div>
            <h1 className="logo">[NOVALEARN]</h1>
          </div>

          {activateNav === true ? (
            <img src={navIcon} onClick={handleNav} alt="" />
          ) : (
            <img src={navAfterIcon} onClick={handleNav} alt="" />
          )}
        </div>
        {activateNav && (
          <div className="mobile-nav-content">
            <div>
              {user.role === "admin" ? (
                <ul>
                  <li>
                    <Link to={`/`} onClick={handleNav}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={`/announcement`} onClick={handleNav}>
                      Announcement
                    </Link>
                  </li>
                  <li>
                    <Link to={`/user-management`} onClick={handleNav}>
                      {" "}
                      User & Course Management
                    </Link>
                  </li>
                  <li>
                    <Link to={`/enrollment`} onClick={handleNav}>
                      Enrollments
                    </Link>
                  </li>
                  <li onClick={handleLogOut}>Logout</li>
                </ul>
              ) : user.role === "lecturer" ? (
                <ul>
                  <li>
                    {" "}
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li>
                    <Link to={`/mainAnnouncement`} onClick={handleNav}>
                      Announcement
                    </Link>
                  </li>
                  <li onClick={handleLogOut}>Logout</li>
                </ul>
              ) : user.role === "student" ? (
                <ul>
                  <li>Home</li>
                  <li onClick={handleLogOut}>Logout</li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </section>

      <section className="main-nav-bar">
        <div>
          <h1 className="logo">[NOVALEARN]</h1>
        </div>
        <div className="page-links">
          {user.role === "admin" ? (
            <ul>
              <li>
                <Link to={`/`} onClick={handleNav}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/announcement`}>Announcement</Link>
              </li>
              <li>
                <Link to={`/user-management`}> User & Course Management</Link>
              </li>
              <li>
                <Link to={`/enrollment`}>Enrollments</Link>
              </li>
            </ul>
          ) : user.role === "lecturer" ? (
            <ul>
              <li>
                <Link to={`/`} onClick={handleNav}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/mainAnnouncement`} onClick={handleNav}>
                  Announcement
                </Link>
              </li>
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
    </React.Fragment>
  );
}

export default MainNavbar;

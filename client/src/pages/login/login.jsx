import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated, setUserDetails }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      const userData = response.data;

      setUserDetails({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        created_at: userData.created_at,
      });

      setIsAuthenticated(true);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userDetails", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <button type="submit">login</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}

export default Login;

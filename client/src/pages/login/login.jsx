import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
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
      await axios.post("http://localhost:6000/api/auth/login", input, {
        withCredentials: true,
      });

      setIsAuthenticated(true);

      localStorage.setItem("isAuthenticated", "true");
      // navigate("/");
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

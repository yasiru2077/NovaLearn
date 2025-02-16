import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [input, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChage = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return <div>Login</div>;
}

export default Login;

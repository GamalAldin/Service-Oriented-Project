


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_BACKEND_URL);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { username, password }) // Ensure this matches your backend
      .then((result) => {
        const { token, message } = result.data; // Destructure response
        if (token) {
          localStorage.setItem("jwtToken", token); // Save token to localStorage
          navigate("/");
        } else {
          setErrorMessage(message || "Invalid credentials, please try again.");
        }
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setErrorMessage("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              autoComplete="off"
              name="username"
              className="form-control rounded-0"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <p>Don't have an account?</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;

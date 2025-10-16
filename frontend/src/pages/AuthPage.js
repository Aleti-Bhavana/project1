import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [step, setStep] = useState(1); // 1 = register, 2 = login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        username,
        password,
        role,
      });
      alert("✅ Registration successful! Now login.");
      setStep(2);       // move to login
      setPassword("");  // clear password
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      alert(msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        username,
        password,
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role); // optional
        alert("✅ Login successful!");
        window.location.href = "/dashboard"; // redirect to dashboard
      } else {
        alert("Login failed: Invalid server response.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Invalid credentials.";
      alert(msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      {step === 1 && (
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthPage;

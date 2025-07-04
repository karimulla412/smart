import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await axios.post("http://localhost:8000/reset-password", {
        username,
        new_password: newPassword,
      });
      setMessage("Password reset successful. You can now log in.");
    } catch (err) {
      setError(err.response?.data?.detail || "Reset failed");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleReset}>
        <div>
          <label>Username:</label><br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/TaskSummary.css";

const TaskSummary = () => {
  const { token } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/tasks-summary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSummary(res.data))
      .catch(() => setError("Failed to load summary"));
  }, [token]);

  if (error) return <p className="error-message">{error}</p>;
  if (!summary) return <p>Loading summary...</p>;

  return (
    <div className="summary-container">
      <h2>Task Summary</h2>
      <div className="summary-cards">
        <div className="summary-card total">
          <div className="icon">📋</div>
          <div className="value">{summary.total_tasks}</div>
          <div className="label">Total Tasks</div>
        </div>
        <div className="summary-card completed">
          <div className="icon">✅</div>
          <div className="value">{summary.completed_tasks}</div>
          <div className="label">Completed Tasks</div>
        </div>
        <div className="summary-card pending">
          <div className="icon">⌛</div>
          <div className="value">{summary.pending_tasks}</div>
          <div className="label">Pending Tasks</div>
        </div>
        <div className="summary-card percentage">
          <div className="icon">🎯</div>
          <div className="value">{summary.completed_percentage}%</div>
          <div className="label">Completion %</div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;

/*import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/TaskByStatus.css";

const TasksByStatus = () => {
  const { token } = useContext(AuthContext);
  const [status, setStatus] = useState("true");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchByStatus = async () => {
    setError(null);
    try {
      const res = await axios.get(`http://localhost:8000/tasks/by-status/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch tasks");
    }
  };

  return (
    <div className="tasks-by-status-container">
      <h2>View Tasks by Status</h2>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
        <button onClick={fetchByStatus}>Fetch</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status ? "Completed" : "Pending"} - {task.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksByStatus;
*/
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/TaskByStatus.css";

const TasksByStatus = () => {
  const { token } = useContext(AuthContext);
  const [status, setStatus] = useState("true");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchByStatus = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/tasks/by-status/${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-container">
      <h2>Find Tasks by Status</h2>
      <div className="status-input-group">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
        <button onClick={fetchByStatus}>Search</button>
      </div>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}

      {tasks.length > 0 && (
        <ul className="status-task-list">
          {tasks.map((task) => (
            <li key={task.id} className="status-task-item">
              <strong>{task.title}</strong> [{task.priority || "N/A"}] <br />
              Category: {task.category} | Status: {task.status ? "Completed" : "Pending"} <br />
              Due: {task.due_date || "N/A"} <br />
              <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks found for this status.</p>
      )}
    </div>
  );
};

export default TasksByStatus;

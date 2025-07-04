import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/TaskByCategory.css";

const TasksByCategory = () => {
  const { token } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!category.trim()) {
      setError("Please enter a category");
      setTasks([]);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/tasks/by-category/${encodeURIComponent(category)}`,
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
    <div className="category-container">
      <h2>Find Tasks by Category</h2>
      <div className="category-input-group">
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFetch}>Search</button>
      </div>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}

      {tasks.length > 0 && (
        <ul className="category-task-list">
          {tasks.map((task) => (
            <li key={task.id} className="category-task-item">
              <strong>{task.title}</strong> [{task.priority || "N/A"}] <br />
              Category: {task.category} | Status: {task.status ? "Completed" : "Pending"} <br />
              Due: {task.due_date || "N/A"} <br />
              <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks found for this category.</p>
      )}
    </div>
  );
};

export default TasksByCategory;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/TaskList.css"; // Make sure this CSS file has the grid and spacing styles

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasklist-container">
      <h2>Your Tasks</h2>
      <Link to="/tasks/new" className="create-link">+ Create New Task</Link>
      {error && <p className="error-message">{error}</p>}
      {tasks.length === 0 && <p>No tasks found.</p>}
      <div className="tasklist-grid">
        {tasks.map((task) => (
          <div key={task.id} className="tasklist-item">
            <div className="tasklist-header">
              <strong>{task.title}</strong>{" "}
              <span className={`priority ${task.priority}`}>[{task.priority || "N/A"}]</span>
            </div>
            <div>
              Category: {task.category} | Status:{" "}
              <span className={`status ${task.status ? "completed" : "pending"}`}>
                {task.status ? "Completed" : "Pending"}
              </span>
            </div>
            <div>Due: {task.due_date || "N/A"}</div>
            <div className="tasklist-actions">
              <Link to={`/tasks/edit/${task.id}`} className="edit-link">Edit</Link>
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;


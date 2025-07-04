
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/TaskForm.css";

const emptyTask = {
  title: "",
  description: "",
  category: "",
  status: false,
  priority: "",
  due_date: "",
};

const TaskForm = ({ edit }) => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState(emptyTask);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) {
      axios
        .get(`http://localhost:8000/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTask(res.data))
        .catch(() => setError("Failed to load task"));
    }
  }, [edit, id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (edit) {
        await axios.put(`http://localhost:8000/tasks/${id}`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8000/tasks/", task, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/tasks");
    } catch (err) {
      setError("Failed to save task");
    }
  };

  return (
    <div className="taskform-container">
      <h2>{edit ? "Edit Task" : "Create Task"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="taskform-form">
        <div className="form-group">
          <label>Title:</label><br />
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description:</label><br />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>
        <div className="form-group">
          <label>Category:</label><br />
          <input
            name="category"
            value={task.category}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Priority (optional):</label><br />
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">--Auto Suggest--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <small className="form-note">
            Leave blank to auto-suggest priority based on title/description
          </small>
        </div>
        <div className="form-group checkbox-group">
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={task.status}
            onChange={handleChange}
            className="checkbox-field"
          />{" "}
          Completed
        </div>
        <div className="form-group">
          <label>Due Date:</label><br />
          <input
            type="date"
            name="due_date"
            value={task.due_date ? task.due_date.slice(0, 10) : ""}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          {edit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

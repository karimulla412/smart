/*mport React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};*/

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks with a valid token
  const fetchTasks = async (jwtToken) => {
    try {
      const res = await axios.get("http://localhost:8000/tasks/", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks after login:", err);
    }
  };

  // Login user and load tasks
  const loginAndLoad = async (username, password) => {
    const res = await axios.post(
      "http://localhost:8000/token",
      new URLSearchParams({ username, password }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    const newToken = res.data.access_token;
    setToken(newToken);
    await fetchTasks(newToken); // fetch tasks after login
  };

  // Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Logout function
  const logout = () => {
    setToken(null);
    setTasks([]);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, tasks, setTasks, loginAndLoad, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import TaskSummary from "./pages/TaskSummary";
import TasksByCategory from "./pages/TasksByCategory";  // import new page
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css"; // Import global styles
import ForgotPassword from "./pages/ForgotPassword";
import TasksByStatus from "./pages/TaskByStatus"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/new"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/edit/:id"
              element={
                <PrivateRoute>
                  <TaskForm edit />
                </PrivateRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <PrivateRoute>
                  <TaskSummary />
                </PrivateRoute>
              }
            />
            {/* New route for tasks by category */}
            <Route
              path="/tasks/category"
              element={
                <PrivateRoute>
                  <TasksByCategory />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/status"
              element={
                <PrivateRoute>
                  <TasksByStatus />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


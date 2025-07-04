/*import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";




const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
      <Link to="/tasks" style={{ marginRight: 15 }}>
        Tasks
      </Link>
      <Link to="/summary" style={{ marginRight: 15 }}>
        Summary
      </Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: 15 }}>
            Login
          </Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      {token && (
        <button onClick={handleLogout} style={{ marginLeft: 15 }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;*/
/*import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/tasks" className="nav-link">
        Tasks
      </Link>
      <Link to="/summary" className="nav-link">
        Summary
      </Link>
      <Link to="/tasks/category" className="nav-link">
        Tasks by Category
      </Link>
      <Link to="/tasks/status" className="nav-link">
        Tasks by Status
      </Link>

      {!token && (
        <>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        </>
      )}

      {token && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
*/
/*import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
  
      <div className="navbar-left">
        <Link to="/tasks" className="nav-link project-title">
          Smart Task Tracker
        </Link>
      </div>

      
      <div className="navbar-right">
        {token && (
          <>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <Link to="/summary" className="nav-link">
              Summary
            </Link>
            <Link to="/tasks/category" className="nav-link">
              Tasks by Category
            </Link>
            <Link to="/tasks/status" className="nav-link">
              Tasks by Status
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;*/
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/tasks" className="nav-link project-title">
          Smart Task Tracker
        </Link>
      </div>

      <div className="navbar-right">
        {token && (
          <>
            <Link to="/tasks" className="nav-link">
              AllTasks
            </Link>
            <Link to="/tasks/new" className="nav-link">
              Create Task
            </Link>
            <Link to="/summary" className="nav-link">
              Summary
            </Link>
            <Link to="/tasks/category" className="nav-link">
              Tasks by Category
            </Link>
            <Link to="/tasks/status" className="nav-link">
              Tasks by Status
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import AddProject from "./components/add-project.component";
import Project from "./components/project.component";
import ProjectList from "./components/project-list.component";
import Login from "./components/login.component";
import ProtectedRoute from "./components/protected.route";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {token && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <h1 className="navbar-brand">Project Manager</h1>

          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/projects" className="nav-link">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add Project
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </li>
          </div>
        </nav>
      )}

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

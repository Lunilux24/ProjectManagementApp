import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import AddProject from "./components/add-project.component";
import Project from "./components/project.component";
import ProjectList from "./components/project-list.component";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Project Manager
        </Link>

        <div className="navbar-nav mr-auto">
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
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/add" element={<AddProject />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

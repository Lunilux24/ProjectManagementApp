import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/project.service";
import { Link } from "react-router-dom";
import { formatStatus } from "../common/status-utils";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    retrieveProjects();
  }, []);

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProjects();
    setCurrentProject(null);
    setCurrentIndex(-1);
  };

  const setActiveProject = (project, index) => {
    // toggle selection: clicking the currently selected project will deselect it
    if (index === currentIndex) {
      setCurrentProject(null);
      setCurrentIndex(-1);
    } else {
      setCurrentProject(project);
      setCurrentIndex(index);
    }
  };

  const searchTitleFunc = () => {
    ProjectDataService.findByName(searchTitle)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedProjects = () => {
    const copy = projects ? [...projects] : [];
    const statusOrder = { ready: 0, in_progress: 1, complete: 2 };
    copy.sort((a, b) => {
      let res = 0;
      if (sortKey === "name") {
        res = (a.name || "").localeCompare(b.name || "");
      } else if (sortKey === "status") {
        res = (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      }
      return sortOrder === "asc" ? res : -res;
    });
    return copy;
  };

  return (
    <div className="list row">
      <div className="col-12 mb-3 d-flex flex-column flex-md-row align-items-start list-header">
        <div className="input-group" style={{ minWidth: 240 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchTitleFunc}
            >
              Search
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <select
            className="form-control mr-2"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="name">Title</option>
            <option value="status">Status</option>
          </select>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div className="col-md-6">
        <h4 className="project-list-title">Project List</h4>
        <ul className="list-group">
          {sortedProjects() &&
            sortedProjects().map((project, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProject(project, index)}
                key={index}
              >
                {project.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-6 project-details">
        {currentProject ? (
          <div className="detail-card">
            <h4 className="detail-item">Project</h4>
            <div className="detail-item">
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentProject.name}
            </div>
            <div className="detail-item">
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProject.description}
            </div>
            <div className="detail-item">
              <label>
                <strong>Date Created:</strong>
              </label>{" "}
              {currentProject.created_at
                ? new Date(currentProject.created_at).toLocaleString()
                : ""}
            </div>
            <div className="detail-item">
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {formatStatus(currentProject.status)}
            </div>

            <div className="detail-item">
              <Link
                to={"/projects/" + currentProject.id}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Select a project to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectList;

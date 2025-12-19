import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectDataService from "../services/project.service";
import { formatStatus } from "../common/status-utils";
import { useTaskSearch } from "../hooks/useTaskSearch";
import { useTaskSort } from "../hooks/useTaskSort";

function TaskList() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [projectName, setProjectName] = useState("");

  const { searchTitle, onChangeSearchTitle, searchTasks } = useTaskSearch(tasks);
  const { sortKey, setSortKey, sortOrder, toggleSortOrder, sortedTasks } = useTaskSort(
    tasks,
    searchTitle,
    searchTasks
  );

  useEffect(() => {
    retrieveProject();
  }, [projectId]);

  const retrieveProject = () => {
    ProjectDataService.get(projectId)
      .then((response) => {
        setTasks(response.data.tasks || []);
        setProjectName(response.data.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTask = (task, index) => {
    if (index === currentIndex) {
      setCurrentTask(null);
      setCurrentIndex(-1);
    } else {
      setCurrentTask(task);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="list row">
      <div className="col-12 mb-3">
        <h4>Tasks for: {projectName}</h4>
        <Link to={`/projects/${projectId}/tasks/add`} className="btn btn-success mb-3">
          Add New Task
        </Link>
      </div>
      
      <div className="col-12 mb-3 d-flex flex-column flex-md-row align-items-start list-header">
        <div className="input-group" style={{ minWidth: 240 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
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
        <h4 className="project-list-title">Task List</h4>
        <ul className="list-group">
          {sortedTasks() &&
            sortedTasks().map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-6 project-details">
        {currentTask ? (
          <div className="detail-card">
            <h4 className="detail-item">Task</h4>
            <div className="detail-item">
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTask.name}
            </div>
            <div className="detail-item">
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description}
            </div>
            <div className="detail-item">
              <label>
                <strong>Date Created:</strong>
              </label>{" "}
              {currentTask.created_at
                ? new Date(currentTask.created_at).toLocaleString()
                : ""}
            </div>
            <div className="detail-item">
              <label>
                <strong>Due Date:</strong>
              </label>{" "}
              {currentTask.due_date || "Not set"}
            </div>
            <div className="detail-item">
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {formatStatus(currentTask.status)}
            </div>

            <div className="detail-item">
              <Link
                to={`/projects/${projectId}/tasks/${currentTask.id}`}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Select a task to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProjectDataService from "../services/project.service";
import { formatStatus } from "../common/status-utils";
import { useTaskEdit } from "../hooks/useTaskEdit";

function Task() {
  const { projectId, id } = useParams();
  const navigate = useNavigate();

  const [currentTask, setCurrentTask] = useState({
    id: null,
    name: "",
    description: "",
    status: "ready",
    due_date: "",
  });
  const [message, setMessage] = useState("");

  const {
    onChangeTitle,
    onChangeDescription,
    updateStatus,
    updateTask,
    deleteTask,
  } = useTaskEdit(currentTask, setCurrentTask, setMessage, projectId, navigate);

  useEffect(() => {
    if (id && projectId) getTask();
  }, [id, projectId]);

  const getTask = () => {
    ProjectDataService.get(projectId)
      .then((response) => {
        const task = response.data.tasks.find((t) => t.id === parseInt(id));
        if (task) {
          setCurrentTask(task);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTask.name}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTask.description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                value={currentTask.due_date || ""}
                onChange={(e) => setCurrentTask((prev) => ({ ...prev, due_date: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {formatStatus(currentTask.status)}
            </div>
          </form>
          <div className="form-group">
            <label htmlFor="statusSelect">
              <strong>Change status:</strong>
            </label>
            <select
              id="statusSelect"
              className="form-control"
              value={currentTask.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="ready">Ready</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>
          <Link to={`/projects/${projectId}/tasks`} className="btn btn-secondary mr-2">
            Back
          </Link>
          <button
            className="btn btn-danger mr-2"
            onClick={deleteTask}
            type="button"
          >
            Delete
          </button>
          <button
            className="btn btn-success"
            onClick={updateTask}
            type="button"
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please select a task...</p>
        </div>
      )}
    </div>
  );
}

export default Task;

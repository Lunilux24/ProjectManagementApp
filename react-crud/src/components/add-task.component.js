import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAddTask } from "../hooks/useAddTask";

function AddTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    name,
    description,
    status,
    setStatus,
    dueDate,
    setDueDate,
    submitted,
    saving,
    onChangeTitle,
    onChangeDescription,
    saveTask,
    newTask,
  } = useAddTask(projectId, navigate);

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Task created successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add Another Task
          </button>
        </div>
      ) : (
        <div>
          <h4>Add Task</h4>
          {saving && (
            <div className="spinner-overlay">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={name}
              onChange={onChangeTitle}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ready">Ready</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>
          <button
            onClick={saveTask}
            className="btn btn-success"
            disabled={saving}
          >
            {saving ? "Saving..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTask;

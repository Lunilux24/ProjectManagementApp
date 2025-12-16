import React, { useState } from "react";
import ProjectDataService from "../services/project.service";
import { toast } from "react-toastify";

function AddProject() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ready");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeTitle = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const extractError = (err) => {
    if (!err || !err.response || !err.response.data) return "Request failed";
    const d = err.response.data;
    if (typeof d === "string") return d;
    if (typeof d === "object") {
      return Object.entries(d)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join(" • ");
    }
    return "Request failed";
  };

  const saveProject = () => {
    const data = { name, description, status };

    if (saving) return;
    setSaving(true);

    ProjectDataService.create(data)
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setSubmitted(true);
        toast.success("Project created");
        setSaving(false);
      })
      .catch((e) => {
        const msg = extractError(e);
        toast.error(msg);
        setSaving(false);
      });
  };

  const newProject = () => {
    setId(null);
    setName("");
    setDescription("");
    setStatus("ready");
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProject}>
            Add Another Project
          </button>
        </div>
      ) : (
        <div>
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
            onClick={saveProject}
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

export default AddProject;

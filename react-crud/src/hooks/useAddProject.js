import { useState } from "react";
import ProjectDataService from "../services/project.service";
import { toast } from "react-toastify";

export const useAddProject = () => {
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

  return {
    id,
    name,
    description,
    status,
    setStatus,
    submitted,
    saving,
    onChangeTitle,
    onChangeDescription,
    saveProject,
    newProject,
  };
};

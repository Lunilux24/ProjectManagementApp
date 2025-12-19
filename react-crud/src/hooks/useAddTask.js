import { useState } from "react";
import ProjectDataService from "../services/project.service";
import { toast } from "react-toastify";

export const useAddTask = (projectId, navigate) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ready");
  const [dueDate, setDueDate] = useState("");
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

  const saveTask = () => {
    const data = {
      name,
      description,
      status,
      due_date: dueDate || null,
    };

    if (saving) return;
    setSaving(true);

    ProjectDataService.createTask(projectId, data)
      .then((response) => {
        setSubmitted(true);
        toast.success("Task created");
        setSaving(false);
        setTimeout(() => {
          navigate(`/projects/${projectId}/tasks`);
        }, 1000);
      })
      .catch((e) => {
        const msg = extractError(e);
        toast.error(msg);
        setSaving(false);
      });
  };

  const newTask = () => {
    setName("");
    setDescription("");
    setStatus("ready");
    setDueDate("");
    setSubmitted(false);
  };

  return {
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
  };
};

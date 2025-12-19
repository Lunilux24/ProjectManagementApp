import { useState } from "react";
import ProjectDataService from "../services/project.service";

export const useTaskOperations = (currentProject, setCurrentProject, setMessage) => {
  const [newTask, setNewTask] = useState({ name: "", description: "", status: "ready" });
  const [taskEdit, setTaskEdit] = useState({});

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskEditChange = (taskId, e) => {
    const { name, value } = e.target;
    setTaskEdit((prev) => ({ ...prev, [taskId]: { ...prev[taskId], [name]: value } }));
  };

  const addTask = () => {
    if (!newTask.name) return;
    ProjectDataService.createTask(currentProject.id, newTask)
      .then((res) => {
        setCurrentProject((prev) => ({ ...prev, tasks: [...prev.tasks, res.data] }));
        setNewTask({ name: "", description: "", status: "ready" });
        setMessage("Task added successfully!");
      })
      .catch((e) => {
        setMessage("Error adding task");
        console.log(e);
      });
  };

  const updateTask = (taskId) => {
    const data = taskEdit[taskId];
    if (!data || !data.name) return;
    ProjectDataService.updateTask(taskId, data)
      .then((res) => {
        setCurrentProject((prev) => ({
          ...prev,
          tasks: prev.tasks.map((t) => (t.id === taskId ? res.data : t)),
        }));
        setTaskEdit((prev) => ({ ...prev, [taskId]: undefined }));
        setMessage("Task updated successfully!");
      })
      .catch((e) => {
        setMessage("Error updating task");
        console.log(e);
      });
  };

  const deleteTask = (taskId) => {
    ProjectDataService.deleteTask(taskId)
      .then(() => {
        setCurrentProject((prev) => ({
          ...prev,
          tasks: prev.tasks.filter((t) => t.id !== taskId),
        }));
        setMessage("Task deleted successfully!");
      })
      .catch((e) => {
        setMessage("Error deleting task");
        console.log(e);
      });
  };

  return {
    newTask,
    taskEdit,
    setTaskEdit,
    handleNewTaskChange,
    handleTaskEditChange,
    addTask,
    updateTask,
    deleteTask,
  };
};

import ProjectDataService from "../services/project.service";

export const useTaskEdit = (currentTask, setCurrentTask, setMessage, projectId, navigate) => {
  const onChangeTitle = (e) => {
    const name = e.target.value;
    setCurrentTask((prev) => ({ ...prev, name }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTask((prev) => ({ ...prev, description }));
  };

  const updateStatus = (status) => {
    const data = {
      ...currentTask,
      status: status,
    };

    ProjectDataService.updateTask(currentTask.id, data)
      .then(() => {
        setCurrentTask((prev) => ({ ...prev, status }));
        setMessage("Status updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTask = () => {
    ProjectDataService.updateTask(currentTask.id, currentTask)
      .then(() => {
        setMessage("Task updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    ProjectDataService.deleteTask(currentTask.id)
      .then(() => {
        navigate(`/projects/${projectId}/tasks`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    onChangeTitle,
    onChangeDescription,
    updateStatus,
    updateTask,
    deleteTask,
  };
};

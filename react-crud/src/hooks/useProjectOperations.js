import ProjectDataService from "../services/project.service";

export const useProjectOperations = (currentProject, setCurrentProject, setMessage, navigate) => {
  const onChangeTitle = (e) => {
    const name = e.target.value;
    setCurrentProject((prev) => ({ ...prev, name }));
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentProject((prev) => ({ ...prev, description }));
  };

  const updateStatus = (status) => {
    // send full payload because backend PUT expects all fields (not partial)
    const data = {
      name: currentProject.name,
      description: currentProject.description,
      status: status,
    };

    ProjectDataService.update(currentProject.id, data)
      .then(() => {
        setCurrentProject((prev) => ({ ...prev, status }));
        setMessage("Status updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateProject = () => {
    ProjectDataService.update(currentProject.id, currentProject)
      .then(() => {
        setMessage("Project updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = () => {
    ProjectDataService.delete(currentProject.id)
      .then(() => {
        navigate("/projects");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    onChangeTitle,
    onChangeDescription,
    updateStatus,
    updateProject,
    deleteProject,
  };
};

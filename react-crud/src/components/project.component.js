import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectDataService from "../services/project.service";
import { formatStatus } from "../common/status-utils";

function Project() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProject, setCurrentProject] = useState({
        id: null,
        name: "",
        description: "",
        status: "ready",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) getProject(id);
    }, [id]);

    const onChangeTitle = (e) => {
        const name = e.target.value;
        setCurrentProject((prev) => ({ ...prev, name }));
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setCurrentProject((prev) => ({ ...prev, description }));
    };

    const getProject = (projectId) => {
        ProjectDataService.get(projectId)
            .then((response) => {
                setCurrentProject(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
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

    return (
        <div>
            {currentProject ? (
                <div className="edit-form">
                    <h4>Project</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentProject.name}
                                onChange={onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentProject.description}
                                onChange={onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {formatStatus(currentProject.status)}
                        </div>
                    </form>
                    <div className="form-group">
                        <label htmlFor="statusSelect">
                            <strong>Change status:</strong>
                        </label>
                        <select
                            id="statusSelect"
                            className="form-control"
                            value={currentProject.status}
                            onChange={(e) => updateStatus(e.target.value)}
                        >
                            <option value="ready">Ready</option>
                            <option value="in_progress">In Progress</option>
                            <option value="complete">Completed</option>
                        </select>
                    </div>
                    <button className="btn btn-danger mr-2" onClick={deleteProject} type="button">
                        Delete
                    </button>
                    <button className="btn btn-success" onClick={updateProject} type="button">
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Project...</p>
                </div>
            )}
        </div>
    );
}

export default Project;


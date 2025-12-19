import http from "../http-common";

const getAll = () => http.get("/projects/");
const get = (id) => http.get(`/projects/${id}/`);
const create = (data) => http.post("/projects/", data);
const update = (id, data) => http.put(`/projects/${id}/`, data);
const remove = (id) => http.delete(`/projects/${id}/`);
const findByName = (name) => http.get(`/projects/?title=${encodeURIComponent(name)}`);

const createTask = (projectId, data) => http.post(`/projects/${projectId}/tasks/`, data);
const updateTask = (taskId, data) => http.put(`/tasks/${taskId}/`, data);
const deleteTask = (taskId) => http.delete(`/tasks/${taskId}/`);

export default {
  getAll,
  get,
  create,
  update,
  delete: remove,
  findByName,
  createTask,
  updateTask,
  deleteTask,
};

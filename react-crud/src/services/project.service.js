import http from "../http-common";

const getAll = () => http.get("/projects/");
const get = (id) => http.get(`/projects/${id}/`);
const create = (data) => http.post("/projects/", data);
const update = (id, data) => http.put(`/projects/${id}/`, data);
const remove = (id) => http.delete(`/projects/${id}/`);
const findByName = (name) =>
  http.get(`/projects/?title=${encodeURIComponent(name)}`);

export default { getAll, get, create, update, delete: remove, findByName };

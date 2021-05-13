import axios from "axios";

const api = axios.create({
  baseUrl: "/",
});

export const getTables = () => api.get("tables").then((res) => res.data);

export const getTableFields = (tablename) =>
  api.get(`${tablename}/fields`).then((res) => res.data);

export const getTableData = (tablename, filters) => {
  return api
    .get(`${tablename}/data/`, { params: filters })
    .then((res) => res.data);
};

import axios from "axios";

const api = axios.create({
  baseUrl: "/",
});

export const getTables = () => api.get("tables").then((res) => res.data);

export const getTableFields = (tablename) =>
  api.get(`${tablename}/fields`).then((res) => res.data);

export const getTableData = (tablename) =>
  api.get(`${tablename}/data/`).then((res) => res.data);

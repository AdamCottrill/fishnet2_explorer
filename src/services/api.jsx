import axios from "axios";

const api = axios.create({
  baseUrl: "/",
});

export const getTables = (projectType) =>
  api.get(`${projectType}/tables`).then((res) => res.data);

export const getTableFields = (projectType, tablename) =>
  api.get(`${projectType}/${tablename}/fields`).then((res) => res.data);

export const getTableData = (projectType, tablename, filters) => {
  return api
    .get(`${projectType}/${tablename}/data/`, { params: filters })
    .then((res) => res.data);
};

export const getRecordCount = (projectType, tablename, filters) =>
  api
    .get(`${projectType}/${tablename}/record_count/`, { params: filters })
    .then((res) => res.data);

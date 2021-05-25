import axios from "axios";

let api;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  api = axios.create({
    baseURL: "/",
  });
} else {
  api = axios.create({
    baseURL: "api/",
  });
}

export const getTables = (projectType) =>
  api.get(`/${projectType}/tables`).then((res) => res.data);

export const getTableFields = (projectType, tablename) =>
  api.get(`/${projectType}/${tablename}/fields`).then((res) => res.data);

export const getTableData = (projectType, tablename, filters) => {
  return api
    .get(`/${projectType}/${tablename}/data/`, { params: filters })
    .then((res) => res.data);
};

export const getRecordCount = (projectType, tablename, filters) =>
  api
    .get(`/${projectType}/${tablename}/record_count/`, { params: filters })
    .then((res) => res.data);

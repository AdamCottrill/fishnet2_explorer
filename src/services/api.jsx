import axios from 'axios';

let api;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  api = axios.create({
    baseURL: '/',
  });
} else {
  api = axios.create({
    baseURL: 'api/',
  });
}

export const getTables = (projectType) =>
  api.get(`/${projectType}/tables`).then((res) => res.data);

export const getTableFields = (projectType, tablename) =>
  api.get(`/${projectType}/${tablename}/fields`).then((res) => res.data);

/** fetch the data from selected table from the chosen project type given the
 * current filters
 *
 * @param {string} projectType
 * @param {string} tablename
 * @param {object} filters
 * @returns
 */
export const getTableData = (projectType, tablename, filters) => {
  return api
    .get(`/${projectType}/${tablename}/data/`, { params: filters })
    .then((res) => res.data);
};

/** Get the number of unique records in the selected
 * project type and table, and current url filters
 *
 * @param {string} projectType
 * @param {string} tablename
 * @param {object} filters
 * @returns
 */
export const getRecordCount = (projectType, tablename, filters) =>
  api
    .get(`/${projectType}/${tablename}/record_count/`, { params: filters })
    .then((res) => res.data);

/** Get the number of distict project (project codes) in the selected
 * project type and table, and current url filters
 *
 * @param {string} projectType
 * @param {string} tablename
 * @param {object} filters
 * @returns
 */
export const getProjectCount = (projectType, tablename, filters) =>
  api
    .get(`/distinct/${projectType}/${tablename}/PRJ_CD/`, { params: filters })
    .then((res) => res.data);

export const getFieldStats = (projectType, tablename, fieldname) =>
  api
    .get(`/field_stats/${projectType}/${tablename}/${fieldname}/`)
    .then((res) => res.data);

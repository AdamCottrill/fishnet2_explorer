import { configureStore } from "@reduxjs/toolkit";

import { tablesApi } from "./services/tables";
import { tableFieldsApi } from "./services/tableFields";
import { tableDataApi } from "./services/tableData";

import tableReducer from "./features/TableSlice";
import fieldsReducer from "./features/FieldsSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    fields: fieldsReducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [tableFieldsApi.reducerPath]: tableFieldsApi.reducer,
    [tableDataApi.reducerPath]: tableDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tablesApi.middleware),
});

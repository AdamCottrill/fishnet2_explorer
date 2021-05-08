import { configureStore } from "@reduxjs/toolkit";

import { tablesApi } from "./services/tables";
import { tableFieldsApi } from "./services/tableFields";

import tableReducer from "./features/TableSlice";

export const store = configureStore({
  reducer: {
    [tablesApi.reducerPath]: tablesApi.reducer,
    table: tableReducer,
    [tableFieldsApi.reducerPath]: tableFieldsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tablesApi.middleware),
});

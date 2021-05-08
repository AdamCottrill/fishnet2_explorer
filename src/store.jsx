import { configureStore } from "@reduxjs/toolkit";

import { tablesApi } from "./services/tables";
import tableReducer from "./features/TableSlice";

export const store = configureStore({
  reducer: {
    [tablesApi.reducerPath]: tablesApi.reducer,
    table: tableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tablesApi.middleware),
});

import { configureStore } from "@reduxjs/toolkit";

import { tablesApi } from "./services/tables";

export const store = configureStore({
  reducer: {
    [tablesApi.reducerPath]: tablesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tablesApi.middleware),
});

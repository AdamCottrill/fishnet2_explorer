import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";

//const API_URL = "http://127.0.0.1:5000";

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTables: builder.query({
      query: () => "tables",
    }),
  }),
});

export const { useGetTablesQuery } = tablesApi;

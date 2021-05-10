import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";

export const tableDataApi = createApi({
  reducerPath: "tableDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTableData: builder.query({
      query: (tablename) => `${tablename}/data/`,
    }),
  }),
});

export const { useGetTableDataQuery } = tableDataApi;

import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";

export const tableFieldsApi = createApi({
  reducerPath: "tableFieldsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTableFields: builder.query({
      query: (tablename) => `${tablename}/fields`,
    }),
  }),
});

export const { useGetTableFieldsQuery } = tableFieldsApi;

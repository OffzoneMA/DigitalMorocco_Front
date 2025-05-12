import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL + "/employee",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployeeById: builder.query({
      query: (employeeId) => `/${employeeId}`,
    }),
  }),
});

export const { useGetEmployeeByIdQuery } = employeeApi;

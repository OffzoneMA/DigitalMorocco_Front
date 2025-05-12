import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: (arg) => {
        const { start, qt, type } = arg;
        return {
          url: "/requests",
          method: "GET",
          params: { start, qt, type },
        };
      },
    }),
    approveUser: builder.mutation({
      query: (arg) => {
        const { userId, role } = arg;
        return {
          url: "/users/ApproveUser/" + userId,
          method: "GET",
          params: { role },
        };
      },
    }),
    rejectUser: builder.mutation({
      query: (arg) => {
        const { userId, role } = arg;
        return {
          url: "/users/RejectUser/" + userId,
          method: "GET",
          params: { role },
        };
      },
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useApproveUserMutation,
  useRejectUserMutation,
} = adminApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const partnerApi = createApi({
  reducerPath: "partnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL + "/partners",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPartners: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: "/",
          method: "GET",
          params: { page },
        };
      },
    }),
    getAllProjects: builder.query({
      query: () => {
        return {
          url: "/Projects",
          method: "GET",
        };
      },
    }),
    createEntreprise: builder.mutation({
      query: (payload) => {
        return {
          url: "/",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useCreateEntrepriseMutation,
  useGetAllPartnersQuery,
  useGetAllProjectsQuery,
} = partnerApi;

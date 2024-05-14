import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_baseURL+"/projects",}), 
  endpoints: (builder) => ({
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: 'DELETE',
      }),
    }),
    getProjectById: builder.query({
      query: (projectId) => `/${projectId}`,
    }),
    addMilestoneToProject: builder.mutation({
      query: ({ projectId, milestoneData }) => ({
        url: `/${projectId}/milestones`,
        method: 'POST',
        body: milestoneData,
      }),
    }),
  }),
});

export const { useDeleteProjectMutation, useGetProjectByIdQuery , useAddMilestoneToProjectMutation } = projectApi;

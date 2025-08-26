import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_baseURL+"/projects",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
          headers.set('authorization', `Bearer ${token}`)
      }
      return headers
  },
  }), 
  endpoints: (builder) => ({
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: 'DELETE',
      }),
    }),
    deleteProjectCompletly: builder.mutation({
      query: (projectId) => ({
        url: `/delete-completly/${projectId}`,
        method: 'DELETE',
      }),
    }),
    deleteProjectLogo: builder.mutation({
      query: (projectId) => ({
        url: `/${projectId}/deleteLogo`,
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
    deleteMilestone: builder.mutation({
      query: ({ projectId, milestoneId }) => ({
          url: `/${projectId}/milestones/${milestoneId}`,
          method: 'DELETE',
      }),
    }),

    getTopSectors: builder.query({
      query: () => '/top-sectors',
    }),

    deleteDocument: builder.mutation({
      query: ({ projectId, documentId }) => ({
        url: `/${projectId}/documents/${documentId}`,
        method: 'DELETE',
      }),
    }),

    getTheDraftProject: builder.query({
      query: () => '/draft',
    }),

    maskProjectsByIds: builder.mutation({
      query: (projectIds) => ({
        url: '/mask-projects-by-ids',
        method: 'PUT',
        body: { projectsIds: projectIds },
      }),
    }),

    unmaskProjectsByIds: builder.mutation({
      query: (projectIds) => ({
        url: '/unmask-projects-by-ids',
        method: 'PUT',
        body: { projectsIds: projectIds },
      }),
    }),

    maskAndUnmaskProjectsByIds: builder.mutation({
      query: (projectIds) => ({
        url: '/mask-unmask-projects',
        method: 'PUT',
        body: { projectsIds: projectIds },
      }),
    }),
  }),
});

export const { useDeleteProjectMutation, useGetProjectByIdQuery , useAddMilestoneToProjectMutation ,
  useDeleteMilestoneMutation , useGetTopSectorsQuery , useDeleteDocumentMutation , useDeleteProjectLogoMutation ,
  useGetTheDraftProjectQuery , useDeleteProjectCompletlyMutation , useMaskProjectsByIdsMutation , useUnmaskProjectsByIdsMutation , 
  useMaskAndUnmaskProjectsByIdsMutation
 } = projectApi;

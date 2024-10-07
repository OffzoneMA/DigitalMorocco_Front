import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définir l'API avec createApi
export const contactRequestApi = createApi({
  reducerPath: 'contactRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+"/contact-requests", 
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
  }),
  endpoints: (builder) => ({
    approveRequest: builder.mutation({
        query: ({ id, approvalData }) => ({
            url: `/${id}/approve`,
            method: 'PUT',
            body: approvalData,
        }),
    }),
    rejectRequest: builder.mutation({
        query: ({ id, rejectionData }) => ({
            url: `/${id}/reject`,
            method: 'PUT',
            body: rejectionData,
        }),
    }),
    getContactRequestById: builder.query({
        query: (id) => ({
            url: `/${id}`,
        }),
    }),
  }),
});

export const { useApproveRequestMutation , useRejectRequestMutation , useGetContactRequestByIdQuery } = contactRequestApi;

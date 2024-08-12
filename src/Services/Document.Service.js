import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/documents",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Document'],
    endpoints: (builder) => ({
        getDocuments: builder.query({
            query: () => '/all',
        }),
        getDocumentsForUser: builder.query({
            query: () => '/user',
        }),
        getDocumentById: builder.query({
            query: (id) => `/${id}`,
        }),
        createDocument: builder.mutation({
            query: (formData) => ({
                url: '/new',
                method: 'POST',
                body: formData,
            }),
        }),
        updateDocument: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        deleteDocument: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
        shareDocument: builder.mutation({
            query: ({ documentId, userIds, userType }) => ({
                url: `/${documentId}/share`,
                method: 'POST',
                body: { userIds, userType },
            }),
        }),
    }),
})

export const {
    useGetDocumentsQuery, useGetDocumentByIdQuery, useCreateDocumentMutation,
  useUpdateDocumentMutation, useDeleteDocumentMutation, useGetDocumentsForUserQuery
  } = documentApi;
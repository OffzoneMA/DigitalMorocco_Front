import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const memberApi = createApi({
    reducerPath: 'memberApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/members",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllMembers: builder.query({
            query: (args) => {
                const { page, sectors, stages, countries } = args;
                return {
                    url: '/',
                    method: 'GET',
                    params: { page, sectors, stages, countries },
                }
            },
        }),
        createEntreprise: builder.mutation({
            query: (payload) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: payload,
                }
            },
        }),
        createProject: builder.mutation({
            query: (payload) => {
                return {
                    url: '/project',
                    method: 'POST',
                    body: payload,
                }
            },
        }),
        updateProject: builder.mutation({
            query: ({ projectId, payload }) => {
                return {
                    url: '/project/'+projectId,
                    method: 'PUT',
                    body: payload,
                }
            },
        }),
        getAllProjects: builder.query({
            query: ({ visibility, status, date }={}) => {
                return {
                    url: '/projects',
                    method: 'GET',
                    params: { visibility, status , date },
                }
            },
        }),

        getAllConatctReq: builder.query({
            query: (arg) => {
                // const { page } = arg;
                return {
                    url: '/ContactRequest',
                    method: 'GET',
                    params: { arg },
                }
            },
        }),
        getAllConatcts: builder.query({
            query: () => {
                return {
                    url: '/Contacts',
                    method: 'GET',
                }
            },
        }),
        createConatctReq: builder.mutation({
            query: (payload) => {
                return {
                    url: '/ContactRequest/' + payload.investorId,
                    method: 'POST',
                }
            },
        }),

        createConatctReqProject: builder.mutation({
            query: (payload) => {
                return {
                    url: '/sendContact',
                    method: 'POST',
                    body: payload
                }
            },
        }),

        buySub: builder.mutation({
            query: (subid) => {
                return {
                url: '/SubscribeMember/' + subid,
                method: 'GET',
            }},
        }),
        deleteLegalDocument: builder.mutation({
            query: (documentId) => ({
              url: `/${documentId}/legal-document`,
              method: 'DELETE',
            }),
        }),
        updateLegalDocument: builder.mutation({
        query: ({ documentId, payload }) => ({
            url: `/${documentId}/legal-document`,
            method: 'PUT',
            body: payload,
        }),
        }),
        createLegalDocument: builder.mutation({
        query: (payload) => ({
            url: '/legal-document',
            method: 'POST',
            body: payload,
        }),
        }),
        deleteEmployee: builder.mutation({
        query: (employeeId) => ({
            url: `/${employeeId}/employee`,
            method: 'DELETE',
        }),
        }),
        updateEmployee: builder.mutation({
        query: ({ employeeId, payload }) => ({
            url: `/${employeeId}/employee`,
            method: 'PUT',
            body: payload,
        }),
        }),
        createEmployee: builder.mutation({
            query: (payload) => ({
              url: '/employee',
              method: 'POST',
              body: payload,
            }),
        }),
        createCompany: builder.mutation({
            query: (logo) => ({
              url: '/company',
              method: 'POST',
              body: logo,
            }),
        }),
        shareProject: builder.mutation({
            query: ({ projectId, investorIds }) => ({
              url: '/share-project',
              method: 'POST',
              body: { projectId, investorIds },
            }),
        }),
    }),
})

export const {useCreateEntrepriseMutation,useGetAllConatctsQuery,useGetAllProjectsQuery,
    useGetAllConatctReqQuery,useCreateConatctReqMutation ,useBuySubMutation,useCreateProjectMutation,
    useGetAllMembersQuery , useUpdateEmployeeMutation, useUpdateProjectMutation, useUpdateLegalDocumentMutation,
    useCreateCompanyMutation, useCreateLegalDocumentMutation, useCreateEmployeeMutation,
    useDeleteEmployeeMutation, useDeleteLegalDocumentMutation , useShareProjectMutation , useCreateConatctReqProjectMutation} = memberApi
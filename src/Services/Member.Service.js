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
        getAllProjects: builder.query({
            query: () => {
                return {
                    url: '/projects',
                    method: 'GET',
                    
                }
            },
        }),

        getAllConatctReq: builder.query({
            query: (arg) => {
                const { page } = arg;
                return {
                    url: '/ContactRequest',
                    method: 'GET',
                    params: { page },
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
        buySub: builder.mutation({
            query: (subid) => {
                return {
                url: '/SubscribeMember/' + subid,
                method: 'GET',
            }},
        }),
    }),
})

export const {useCreateEntrepriseMutation,useGetAllConatctsQuery,useGetAllProjectsQuery,useGetAllConatctReqQuery,useCreateConatctReqMutation ,useBuySubMutation,useCreateProjectMutation,useGetAllMembersQuery} = memberApi
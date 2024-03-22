import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const investorApi = createApi({
    reducerPath: 'investorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/investors",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllInvestors: builder.query({
            query: (arg) => {
                const { page } = arg;
                return {
                    url: '/',
                    method: 'GET',
                    params: { page },
                }
            },
        }),
        getAllConatctReq: builder.query({
            query: (arg) => {
                const { page,status } = arg;
                return {
                    url: '/ContactRequest',
                    method: 'GET',
                    params: { page, status },
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
        getAllProjects: builder.query({
            query: () => {
                return {
                    url: '/Projects',
                    method: 'GET',
                }
            },
        }),
        updateConatctReq: builder.mutation({
            query: (payload) => {
                return {
                    url: '/ContactRequest/' + payload.requestId,
                    method: 'PUT',
                    body: { response:payload.response }
                }
            },
        }),
    }),
})

export const {useGetAllInvestorsQuery,useUpdateConatctReqMutation,useGetAllConatctsQuery,useGetAllProjectsQuery} = investorApi
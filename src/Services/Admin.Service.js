import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL ,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllRequests: builder.query({
            query: (arg) => {
                const {  start, qt,type } = arg;
                return {
                    url: '/requests',
                    method: 'GET',
                    params: { start, qt, type },
                }
            },
            providesTags: ['Requests'],
        }),

    }),
})

export const { useGetAllRequestsQuery} = adminApi
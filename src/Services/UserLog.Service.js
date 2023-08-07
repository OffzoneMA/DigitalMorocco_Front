import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userLogApi = createApi({
    reducerPath: 'userLogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL +"/logs",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            query: (arg) => {
                const { start, qt } = arg;
                return {
                    url: '/',
                    method: 'GET',
                    params: { start, qt },
                }
            },
        }),


    }),
})

export const { useGetAllEventsQuery } = userLogApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subsApi = createApi({
    reducerPath: 'subsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL +"/subscriptions",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllSubscriptons: builder.query({
            query: () => {
                return {
                    url: '/',
                    method: 'GET',
                }
            },
        }),

    }),
})

export const { useGetAllSubscriptonsQuery } = subsApi
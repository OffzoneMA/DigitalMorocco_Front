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
        addStartup: builder.mutation({
            query: (payload) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: payload,
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

export const {useAddStartupMutation ,useBuySubMutation} = memberApi
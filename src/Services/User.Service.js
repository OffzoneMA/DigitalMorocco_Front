import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL + "/users",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (payload) => {
                return {
                    url: '/',
                    method: 'PUT',
                    body: payload,
                }
            },
        }),
    }),
})

export const { useUpdateUserMutation } = userApi
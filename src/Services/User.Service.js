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

        updateFullName: builder.mutation({
            query: ({ userId, payload }) => {
                console.log(payload)
                return {
                    url: `/updateFullName/${userId}`,
                    method: 'PUT',
                    body: payload,
                }
            },
        }),
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: '/AllUsers',
                    method: 'GET',
                }
            },
        }),
    }),
})

export const { useUpdateUserMutation , useUpdateFullNameMutation , useGetAllUsersQuery} = userApi
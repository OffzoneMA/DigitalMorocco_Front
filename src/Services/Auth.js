import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)  
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/users/UserInfo',
        method: 'GET',
      }),

    }),



  }),
})

export const { useGetUserDetailsQuery } = authApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+'/users',
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
        url: '/UserInfo',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    sendEmailVerification: builder.query({
      query: (userId) => ({
        url: '/sendverify/' + userId,
        method: 'GET',
      }),
    }),
    addNewRequest: builder.mutation({
      query: (payload) => ({
        url: '/complete_signup/' +payload.userId,
        method: 'POST',
        body: payload.formdata,
      }),
      invalidatesTags: ['user'],
    }),


  }),
})

export const { useGetUserDetailsQuery,useSendEmailVerificationQuery,useAddNewRequestMutation } = authApi
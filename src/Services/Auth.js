import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL + "/users",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/UserInfo",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    sendEmailVerification: builder.query({
      query: ({ userId, lang }) => ({
        url: `/sendverify/${userId}?lang=${lang}`,
        method: "GET",
      }),
    }),
    getUserByEmail: builder.query({
      query: (email) => `/${email}`,
    }),
    addNewRequest: builder.mutation({
      query: (payload) => ({
        url: "/complete_signup/" + payload.userId,
        method: "POST",
        body: payload.formdata,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
    sendForgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email: payload.email, lang: payload?.lang },
      }),
    }),
    verifyOTP: builder.mutation({
      query: (payload) => ({
        url: "/otp/verify",
        method: "POST",
        body: { enteredOTP: payload.code, email: payload.email },
      }),
    }),
    sendOTP: builder.mutation({
      query: (payload) => ({
        url: "/otp/send",
        method: "POST",
        body: { email: payload },
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useSendEmailVerificationQuery,
  useAddNewRequestMutation,
  useResetPasswordMutation,
  useSendForgotPasswordMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
  useGetUserByEmailQuery,
} = authApi;

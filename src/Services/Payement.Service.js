import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_baseURL+"/payment",}), 
    endpoints: (builder) => ({
        createPaymentSession: builder.mutation({
        query: (data) => ({
            url: '/create-session',
            method: 'POST',
            body: data,
        }),
        }),
        paymentCallback: builder.mutation({
        query: (data) => ({
            url: '/callback',
            method: 'POST',
            body: data,
        }),
        }),
    }),
});

export const { useCreatePaymentSessionMutation, usePaymentCallbackMutation } = paymentApi;
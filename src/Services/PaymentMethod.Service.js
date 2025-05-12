import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentMethodApi = createApi({
  reducerPath: "paymentMethodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL + "/payment-methods",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    addPaymentMethod: builder.mutation({
      query: (paymentMethodData) => ({
        url: "/",
        method: "POST",
        body: paymentMethodData,
      }),
    }),
    deletePaymentMethod: builder.mutation({
      query: (paymentMethodId) => ({
        url: `/${paymentMethodId}`,
        method: "DELETE", // Delete payment method
      }),
    }),
    updatePaymentMethod: builder.mutation({
      query: ({ paymentMethodId, paymentMethodData }) => ({
        url: `/${paymentMethodId}`,
        method: "PUT",
        body: paymentMethodData,
      }),
    }),
    getPaymentMethodById: builder.query({
      query: (paymentMethodId) => `/${paymentMethodId}`,
    }),
    getLastPaymentMethods: builder.query({
      query: () => ({
        url: "/last",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useGetPaymentMethodByIdQuery,
  useGetLastPaymentMethodsQuery,
} = paymentMethodApi;

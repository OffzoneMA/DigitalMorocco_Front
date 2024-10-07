import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définir l'API avec createApi
export const billingApi = createApi({
  reducerPath: 'billingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+"/billing", 
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
  }),
  endpoints: (builder) => ({
    createBilling: builder.mutation({
      query: ({ userId, formData }) => {
        return {
          url: `billing/${userId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    getBillingsForUser: builder.query({
      query: (userId) => `billing/${userId}`,
      providesTags: ['Billing'],
    }),

    deleteBilling: builder.mutation({
      query: (billingId) => ({
        url: `billing/${billingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Billing'],
    }),
  }),
});

export const {useCreateBillingMutation,
    useGetBillingsForUserQuery,
    useDeleteBillingMutation,  } = billingApi;

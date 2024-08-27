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
        createSubscriptionForUser: builder.mutation({
            query: ({ planId, data }) => ({
                url: `/user/plan/${planId}`,
                method: 'POST',
                body: data,
            }),
        }),
        upgradeSubscription: builder.mutation({
            query: ({ subscriptionId, newPlanId, newBilling }) => ({
                url: `/${subscriptionId}/upgrade`,
                method: 'POST',
                body: {newPlanId, newBilling },
            }),
        }),
        getSubscriptionById: builder.query({
            query: (id) => `/${id}`,
        }),

        // Annuler une souscription
        cancelSubscription: builder.mutation({
        query: (id) => ({
                url: `/${id}`,
                method: 'PATCH',
            }),
        }),
        autoCancelExpiredSubscriptions: builder.mutation({
            query: () => ({
                url: '/auto-cancel',
                method: 'POST',
            }),
        }),

        // Mettre une souscription en pause
        pauseSubscription: builder.mutation({
            query: (id) => ({
                url: `/${id}/pause`,
                method: 'PATCH',
            }),
        }),
        getSubscriptionsByUser: builder.query({
            query: () => `/user`,
        }),

        renewSubscription: builder.mutation({
            query: (subscriptionId) => ({
                url: `/${subscriptionId}/renew`,
                method: 'POST',
            }),
        }),

    }),
})

export const { useGetAllSubscriptonsQuery , useCreateSubscriptionForUserMutation, useUpgradeSubscriptionMutation,
     useGetSubscriptionByIdQuery, useCancelSubscriptionMutation, useAutoCancelExpiredSubscriptionsMutation, 
     usePauseSubscriptionMutation, useGetSubscriptionsByUserQuery, useRenewSubscriptionMutation } = subsApi
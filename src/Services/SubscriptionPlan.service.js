import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subscriptionPlanApi = createApi({
    reducerPath: 'subscriptionPlanApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL +"/subscription-plans",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['SubscriptionPlan'],
    endpoints: (builder) => ({
        getAllSubscriptionPlans: builder.query({
            query: () => '/',
            providesTags: ['SubscriptionPlan'],
        }),

        getSubscriptionPlanById: builder.query({
            query: (planId) => `/${planId}`,
            providesTags: (result, error, planId) => [{ type: 'SubscriptionPlan', id: planId }],
        }),

        createSubscriptionPlan: builder.mutation({
            query: ({ userId, newPlan }) => ({
                url: `/${userId}`,
                method: 'POST',
                body: newPlan,
            }),
            invalidatesTags: ['SubscriptionPlan'],
        }),
        updateSubscriptionPlan: builder.mutation({
            query: ({ planId, updatedPlan }) => ({
                url: `/${planId}`,
                method: 'PUT',
                body: updatedPlan,
            }),
            invalidatesTags: (result, error, { planId }) => [{ type: 'SubscriptionPlan', id: planId }],
        }),

        deleteSubscriptionPlan: builder.mutation({
            query: (planId) => ({
                url: `/${planId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, planId) => [{ type: 'SubscriptionPlan', id: planId }],
        }),
    }),
})

export const { useGetAllSubscriptionPlansQuery , useGetSubscriptionPlanByIdQuery ,
    useCreateSubscriptionPlanMutation , useUpdateSubscriptionPlanMutation , useDeleteSubscriptionPlanMutation
 } = subscriptionPlanApi
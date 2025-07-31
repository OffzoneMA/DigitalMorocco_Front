import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const investorAccessLogApi = createApi({
reducerPath: 'investorAccessLogApi',
baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+"/investor-access-logs",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
}),
endpoints: (builder) => ({
    logInvestorAccess: builder.mutation({
        query: ({ userId, data }) => ({
            url: `/${userId}`,
            method: 'POST',
            body: data,
        }),
    }),

    getInvestorAccessLogs: builder.query({
        query: () => `/$`,
    }),

    getInvestorAccessLogById: builder.query({
        query: (logId) => `/${logId}`,
    }),

    deleteInvestorAccessLog: builder.mutation({
        query: (logId) => ({
            url: `/${logId}`,
            method: 'DELETE',
        }),
    }),

    updateInvestorAccessLog: builder.mutation({
        query: ({ logId, data }) => ({
            url: `/${logId}`,
            method: 'PATCH',
            body: data,
        }),
    }),

    getAccessLogsByUser: builder.query({
        query: (userId) => `/user/${userId}`,
    }),

    getLasAccessLogByUser: builder.query({
        query: (userId) => `/user/${userId}/last`,
    }),

    getAccessLogsByConnectedUser: builder.query({
        query: () => `/connectedUser`,
    }),

    getLastAccessLogByConnectedUser: builder.query({
        query: () => `/connectedUser/last`,
    }),

    getAccessLogsByDate : builder.query({
        query: (date) => `/date/${date}`,
    }),

    getAccessLogsByUserAndDate: builder.query({
        query: ({ userId, date }) => `/user/${userId}/date/${date}`,
    }),
    
}),
})

export const {
    useLogInvestorAccessMutation, useGetInvestorAccessLogsQuery, useGetInvestorAccessLogByIdQuery, 
    useDeleteInvestorAccessLogMutation, useUpdateInvestorAccessLogMutation, useGetAccessLogsByUserQuery,
    useGetLasAccessLogByUserQuery, useGetAccessLogsByConnectedUserQuery, useGetLastAccessLogByConnectedUserQuery,
    useGetAccessLogsByDateQuery, useGetAccessLogsByUserAndDateQuery
} = investorAccessLogApi
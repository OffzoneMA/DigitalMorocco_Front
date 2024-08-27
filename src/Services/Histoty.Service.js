import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définir l'API avec createApi
export const activityHistoryApi = createApi({
  reducerPath: 'activityHistoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_baseURL+"/activity-history", 
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
  }),
  endpoints: (builder) => ({
    getActivityHistories: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useGetActivityHistoriesQuery } = activityHistoryApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Fonction utilitaire pour formater la date
const formatDate = (date) => {
  if (!date) return undefined;
  if (typeof date === 'string') return date.split('T')[0];
  return date.toISOString().split('T')[0];
};

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

    // Récupérer tous les historiques avec filtres
    getAllActivityHistories: builder.query({
      query: ({ date, userIds } = {}) => {
        const params = new URLSearchParams();
        const formattedDate = formatDate(date);
        if (date) params.append('date', formattedDate);
        if (userIds?.length) params.append('userIds', JSON.stringify(userIds));
        return `/?${params.toString()}`;
      },
    }),

    // Récupérer les historiques des membres avec filtres
    getMemberActivityHistories: builder.query({
      query: ({ date, userIds } = {}) => {
        const params = new URLSearchParams();
        const formattedDate = formatDate(date);
        if (date) params.append('date', formattedDate);
        if (userIds?.length) params.append('userIds', JSON.stringify(userIds));
        return `/members?${params.toString()}`;
      },
    }),

    // Récupérer les historiques des investisseurs avec filtres
    getInvestorActivityHistories: builder.query({
      query: ({ date, userIds } = {}) => {
        const params = new URLSearchParams();
        const formattedDate = formatDate(date);
        if (date) params.append('date', formattedDate);
        if (userIds?.length) params.append('userIds', JSON.stringify(userIds));
        return `/investors?${params.toString()}`;
      },
    }),

    // Récupérer les historiques des partenaires avec filtres
    getPartnerActivityHistories: builder.query({
      query: ({ date, userIds } = {}) => {
        const params = new URLSearchParams();
        const formattedDate = formatDate(date);
        if (date) params.append('date', formattedDate);
        if (userIds?.length) params.append('userIds', JSON.stringify(userIds));
        return `/partners?${params.toString()}`;
      },
    }),

    getHistoryUsers: builder.query({
      query: (role) => {
        const params = new URLSearchParams();
        if (role) params.append('role', role);
        return `/users?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetActivityHistoriesQuery , useGetInvestorActivityHistoriesQuery , useGetMemberActivityHistoriesQuery
  , useGetPartnerActivityHistoriesQuery , useGetAllActivityHistoriesQuery , useGetHistoryUsersQuery
 } = activityHistoryApi;

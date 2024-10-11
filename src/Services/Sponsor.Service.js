import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sponsorApi = createApi({
    reducerPath: 'sponsorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/sponsors",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        createSponsor: builder.mutation({
            query: (sponsorData) => ({
                url: '/',
                method: 'POST',
                body: sponsorData,
            }),
        }),
        getAllSponsors: builder.query({
            query: ({ page = 1, pageSize = 10, ...filters }) => {
                const query = new URLSearchParams({ page, pageSize, ...filters }).toString();
                return `/?${query}`;
            },
        }),
        getSponsorById: builder.query({
            query: (sponsorId) => `/${sponsorId}`,
        }),
        approveSponsor: builder.mutation({
            query: ({ sponsorId, letter }) => ({
                url: `/${sponsorId}/approve`,
                method: 'POST',
                params: { letter },
            }),
        }),
        rejectSponsor: builder.mutation({
            query: ({ sponsorId, reasonForRejection }) => ({
                url: `/${sponsorId}/reject`,
                method: 'POST',
                params: { reasonForRejection },
            }),
        }),
        updateSponsor: builder.mutation({
            query: ({ sponsorId, updateData }) => ({
                url: `/${sponsorId}`,
                method: 'PUT',
                body: updateData,
            }),
        }),
        deleteSponsor: builder.mutation({
            query: (sponsorId) => ({
                url: `/${sponsorId}`,
                method: 'DELETE',
            }),
        }),
        getSponsorsByPartner: builder.query({
            query: ({ partnerId, page = 1, pageSize = 10, ...filters }) => {
                const query = new URLSearchParams({ page, pageSize, ...filters }).toString();
                return `/${partnerId}/partners?${query}`;
            },
        }),
        getApprovedSponsorsForPastEvents: builder.query({
            query: (filters) => {
                const query = new URLSearchParams(filters).toString();
                return `/past-events?${query}`;
            },
        }),
        getApprovedSponsorsForPartner: builder.query({
            query: ({ partnerId, ...filters }) => {
                const query = new URLSearchParams(filters).toString();
                return `/${partnerId}/approved-sponsors?${query}`;
            },
        }),
    }),
})

export const { } = sponsorApi
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
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData,
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
            query: ({ sponsorId, data }) => ({
                url: `/${sponsorId}/approve`,
                method: 'POST',
                body: data,
            }),
        }),
        rejectSponsor: builder.mutation({
            query: ({ sponsorId , data }) => ({
                url: `/${sponsorId}/reject`,
                method: 'POST',
                body: data,
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
            query: ({ page = 1, pageSize = 8, location , exactDate , requestType , status}={}) => ({
                url: `/partners`,
                params: {page, pageSize, requestType, location, exactDate , status}
            }),
        }),
        getSponsorsHistoryByPartner: builder.query({
            query: ({ page = 1, pageSize = 8, location , exactDate , requestType , status}={}) => ({
                url: `/partners/history`,
                params: {page, pageSize, requestType, location, exactDate , status}
            }),
        }),
        getApprovedSponsorsForPastEvents: builder.query({
            query: ({ page = 1, pageSize = 8, location , exactDate , sponsorshipType }={}) => ({
                url:  `/past-events`,
                params: {page, pageSize, sponsorshipType, location, exactDate}
            }),
        }),
        getApprovedSponsorsForPartner: builder.query({
            query: ({ page = 1, pageSize = 8, location , exactDate , sponsorshipType }={}) => ({
                url: `/approved-sponsors`,
                params: {page, pageSize, sponsorshipType, location, exactDate}
            }),
        }),
        getDistinctEventFieldsByPartner: builder.query({
            query: ({field, eventStatus , sponsorStatus }) => 
                `/partner/distinct?field=${field}${eventStatus ? `&eventStatus=${eventStatus}` : ''}${sponsorStatus ? `&sponsorStatus=${sponsorStatus}` : ''}`,
            providesTags: ['Event'],
        }),
        getDistinctEventFieldsByPartnerHistory: builder.query({
            query: ({field, eventStatus , sponsorStatus }) => 
                `/partner/history/distinct?field=${field}${eventStatus ? `&eventStatus=${eventStatus}` : ''}${sponsorStatus ? `&sponsorStatus=${sponsorStatus}` : ''}`,
            providesTags: ['Event'],
        }),
        getRecentSponsorsByPartnerAndStatus: builder.query({
            query: ({status , requestType}) => 
                `/recentByPartner?status=${status}&requestType=${requestType}`, 
            transformResponse: (response) => response.data, 
        }),
    }),
})

export const { useCreateSponsorMutation  , useApproveSponsorMutation , useDeleteSponsorMutation , 
    useGetAllSponsorsQuery , useGetApprovedSponsorsForPartnerQuery , useGetApprovedSponsorsForPastEventsQuery , 
    useGetSponsorByIdQuery , useGetSponsorsByPartnerQuery , useRejectSponsorMutation , useUpdateSponsorMutation , 
    useGetDistinctEventFieldsByPartnerQuery , useGetSponsorsHistoryByPartnerQuery , useGetDistinctEventFieldsByPartnerHistoryQuery ,
    useGetRecentSponsorsByPartnerAndStatusQuery
} = sponsorApi
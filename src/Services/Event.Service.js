import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/events",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        createEvent: builder.mutation({
            query: (eventData) => ({
              url: '/createEvent',
              method: 'POST',
              body: eventData,
            }),
        }),
        getEvents: builder.query({
            query: (params) => ({
              url: '/',
              method: 'GET',
              params,
            }),
            providesTags: ['Event'],
        }),
        getEventById: builder.query({
            query: (id) => ({
              url: `/${id}/withParticipate`,
              method: 'GET',
            }),
            providesTags: ['Event'],
        }),
        updateEvent: builder.mutation({
            query: ({ id, ...data }) => ({
              url: `/update/${id}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Event'],
        }),
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),
        getAllEventsByUser: builder.query({
            query: (userId) => ({
              url: `/user/${userId}/events`,
              method: 'GET',
            }),
            providesTags: ['Event'],
        }),
        addAttendeeToEvent: builder.mutation({
            query: ({ eventId, attendeeData }) => ({
              url: `/${eventId}/add-attendee`,
              method: 'POST',
              body: attendeeData,
            }),
            invalidatesTags: ['Event'],
        }),
        getEventsForUser: builder.query({
            query: ({ page, pageSize, physicalLocation, eventNames }= {}) => ({
                url: '/authuser',
                method: 'GET',
                params: {page, pageSize, physicalLocation, eventNames  },
              }),
              providesTags: ['Event'],
        }),
        getAllPastEventsUserParticipate: builder.query({
            query: ({ page, pageSize }= {}) => ({
              url: `/past/participate`,
              method: 'GET',
              params: {page, pageSize },
            }),
            providesTags: ['Event'],
        }),
        getAllUpcomingEventsUserParticipate: builder.query({
          query: ({ page, pageSize, location, startDate } = {}) => {
            const params = { page, pageSize , location , startDate };
            return {
              url: `/upcoming/participate`,
              method: 'GET',
              params,
            };
          },
          providesTags: ['Event'],
        }),

        getAllUpcomingEventsSponsors: builder.query({
          query: ({ page, pageSize, location, startDate } = {}) => {
            const params = { page, pageSize , location , startDate };
            return {
              url: `/upcoming/partner`,
              method: 'GET',
              params,
            };
          },
          providesTags: ['Event'],
        }),

        getDistinctValuesByUser: builder.query({
          query: ({field }) => `/distinct/user/${field}`,
        }),
        getDistinctValues: builder.query({
          query: ({ field, filters }) => {
            // Construire les filtres à ajouter à la requête
            const queryParams = new URLSearchParams(filters).toString();
            return `/distinct/${field}?${queryParams}`;
          },
        }),
        getDistinctValuesByPartnerSponsor: builder.query({
          query: (field) => `/partner/distinct/${field}`,
        }),
    }),
})

export const {
    useCreateEventMutation, useGetDistinctValuesQuery ,
    useGetEventsQuery,
    useGetEventByIdQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetAllEventsByUserQuery,
    useAddAttendeeToEventMutation, useGetEventsForUserQuery, 
    useGetAllPastEventsUserParticipateQuery , useGetDistinctValuesByUserQuery ,
    useGetAllUpcomingEventsUserParticipateQuery , useGetAllUpcomingEventsSponsorsQuery ,
    useGetDistinctValuesByPartnerSponsorQuery
  } = eventApi;
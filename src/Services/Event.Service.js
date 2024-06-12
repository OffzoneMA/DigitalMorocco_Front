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
              url: `/${id}`,
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
            query: () => ({
                url: '/authuser',
                method: 'GET',
              }),
              providesTags: ['Event'],
        }),
    }),
})

export const {
    useCreateEventMutation,
    useGetEventsQuery,
    useGetEventByIdQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetAllEventsByUserQuery,
    useAddAttendeeToEventMutation, useGetEventsForUserQuery
  } = eventApi;
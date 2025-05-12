import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL + "/notifications",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (newNotification) => ({
        url: "/",
        method: "POST",
        body: newNotification,
      }),
      invalidatesTags: ["Notification"],
    }),

    // Endpoint pour récupérer toutes les notifications pour un utilisateur
    getNotifications: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Endpoint pour récupérer le résumé des notifications avec le nombre non lus
    getNotificationSummary: builder.query({
      query: () => ({
        url: "/summary",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Endpoint pour marquer plusieurs notifications comme lues
    markNotificationsAsRead: builder.mutation({
      query: (notificationIds) => ({
        url: "/mark-as-read",
        method: "PUT",
        body: { notificationIds },
      }),
      invalidatesTags: ["Notification"],
    }),

    // Endpoint pour marquer une notification comme lue
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // Endpoint pour supprimer une notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useGetNotificationSummaryQuery,
  useMarkNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;

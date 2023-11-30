import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL +"/messages",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (payload) => {
                return {
                    url: '/addMessage', // Adjust the URL as per your server's API
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        
        getMessages: builder.query({
            query: (chatRoomID) => {
                return {
                    url: `/${chatRoomID}`, // Adjust the URL as per your server's API
                    method: 'GET',
                };
            },
        }),

                // Add a new mutation endpoint for creating a chat room
                createChatRoom: builder.mutation({
                    query: (participants) => {
                        return {
                            url: '/createChat', // Adjust the URL as per your server's API
                            method: 'POST',
                            body: {participants},
                        };
                    },
                }),
        
                // Add a new query endpoint for retrieving chat room information
                getChatRooms: builder.query({
                    query: () => {
                        return {
                            url: `/chatRooms`, // Adjust the URL as per your server's API
                            method: 'GET',
                        };
                    },
                }),
    }),
})

export const { useSendMessageMutation, useGetMessagesQuery, useCreateChatRoomMutation, useGetChatRoomsQuery  } = messageApi
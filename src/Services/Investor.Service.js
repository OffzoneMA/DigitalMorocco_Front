import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const investorApi = createApi({
    reducerPath: 'investorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_baseURL+"/investors",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllInvestors: builder.query({
            query: (arg) => {
                const { page } = arg;
                return {
                    url: '/',
                    method: 'GET',
                    params: { page },
                }
            },
        }),
        getAllConatctReq: builder.query({
            query: (arg) => {
                const { page,status } = arg;
                return {
                    url: '/ContactRequest',
                    method: 'GET',
                    params: { page, status },
                }
            },
        }),
        getAllConatcts: builder.query({
            query: () => {
                return {
                    url: '/Contacts',
                    method: 'GET',
                }
            },
        }),
        getAllProjects: builder.query({
            query: () => {
                return {
                    url: '/Projects',
                    method: 'GET',
                }
            },
        }),
        updateConatctReq: builder.mutation({
            query: (payload) => {
                return {
                    url: '/ContactRequest/' + payload.requestId,
                    method: 'PUT',
                    body: { response:payload.response }
                }
            },
        }),
          // Fetch chat conversations for a member
          createChatRoomWithMember: builder.mutation({
            query: (memberId) => {
              return {
                url: '/chat/' + memberId,
                method: 'POST',
              };
            },
          }),
           // Fetch messages in a specific chat room
      getChatMessagesInRoom: builder.query({
        query: (roomId) => {
          return {
            url: '/chat/${roomId}/messages',
            method: 'GET',
          };
        },
      }),
  
      // Send a chat message in a specific chat room
      sendChatMessageInRoom: builder.mutation({
        query: (payload) => {
          return {
            url: '/chat/${payload.roomId}/messages',
            method: 'POST',
            body: payload,
          };
        },
      }),
      getInvestorConversations: builder.query({
        query: (investorId) => {
            return {
            url: '/conversations/' + investorId,
            method: 'GET',
        }},
    
    }),
    }),
})

export const {useGetAllInvestorsQuery,useUpdateConatctReqMutation,useGetAllConatctsQuery,useGetAllProjectsQuery, useCreateChatRoomWithMemberMutation,useGetChatMessagesInRoomQuery, useSendChatMessageInRoomMutation, useGetInvestorConversationsQuery} = investorApi
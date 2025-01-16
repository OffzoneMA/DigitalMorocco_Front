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
                return {
                    url: '/',
                    method: 'GET',
                    params: arg,
                }
            },
        }),
        getInvestorsList: builder.query({
            query: ({ page, pageSize, type, location, industries }={}) => {
                return {
                    url: '/',
                    params: {
                        page, pageSize, type, location, industries}
                    }
            },
        }),
        getInvestorsListForMember: builder.query({
            query: ({ page, pageSize, type, location, industries , keywords }={}) => {
                return {
                    url: '/forMember',
                    params: {
                        page, pageSize, type, location, industries , keywords}
                    }
            },
        }),

        getAllInvestorsWithoutPage: builder.query({
            query: (arg) => {
                return {
                    url: '/withoutPage',
                    method: 'GET',
                    params: arg,
                }
            },
        }),
        getInvestors: builder.query({
            query: () => {
                return {
                    url: '/all',
                    method: 'GET',
                }
            },
        }),
        getAllConatctReq: builder.query({
            query: ({ page, pageSize, status, funding , projectSectors , country , projectStage , projectStatus }={}) => {
                return {
                    url: '/ContactRequest',
                    method: 'GET',
                    params: { page, pageSize , status , funding , projectSectors , country , projectStage , projectStatus},
                }
            },
        }),
        getRecentApprovedContactRequests: builder.query({
            query: () => '/contact-requests/recent-approved',
        }),
        getAllContactReqByInvestor: builder.query({
            query: ({ investorId, page, pageSize, status, funding, projectSectors, country, projectStage, projectStatus } = {}) => {
                return {
                    url: `/ContactRequestByUser/${investorId}`, 
                    method: 'GET',
                    params: { page, pageSize, status, funding, projectSectors, country, projectStage, projectStatus },
                };
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
        getDistinctValues: builder.query({
            query: (field) => `/distinct/${field}`,
        }),
        getInvestorById: builder.query({
            query: (id) => `/byId/${id}`,
        }),

        getDistinctProjectFields: builder.query({
            query: ({ field, status }) => {
                return {
                    url: '/contactRequests/distinct-project-fields',
                    method: 'GET',
                    params: { field , status },
                }
            },
        }),
        getDistinctRequestFieldValues: builder.query({
            query: (field) => 
                `/request/distinct/${field}`, 
        }),
        getLastRecentContactRequests: builder.query({
            query: ({status }) => ({
                url: '/recent-requests/last',
                params: {status }, 
            }),
        }),
        getContactRequestsCount: builder.query({
            query: (investorId) => `/contact-requests/count`,
        }),
    }),
})

export const {useGetAllInvestorsQuery,useUpdateConatctReqMutation,useGetAllConatctsQuery,useGetAllProjectsQuery , 
    useGetInvestorsQuery , useGetDistinctValuesQuery , useGetInvestorByIdQuery , useGetAllConatctReqQuery ,
useGetAllInvestorsWithoutPageQuery , useGetDistinctProjectFieldsQuery , useGetDistinctRequestFieldValuesQuery , 
useGetInvestorsListQuery , useGetAllContactReqByInvestorQuery , useGetRecentApprovedContactRequestsQuery ,
useGetLastRecentContactRequestsQuery , useGetContactRequestsCountQuery , useGetInvestorsListForMemberQuery
} = investorApi
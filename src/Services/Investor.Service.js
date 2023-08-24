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

    }),
})

export const {useGetAllInvestorsQuery} = investorApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sellerApi = createApi({
    reducerPath: 'sellerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/shop`,
        prepareHeaders: (headers, { getState }) => {

            const sellerToken = getState().auth.sellerToken

            if (sellerToken) headers.set('seller', `Seller ${sellerToken}`)

            return headers
        },
    }),
    endpoints: (builder) => ({
        sellerRegister: builder.mutation({
            query: (info) => ({
                url: 'register',
                method: 'POST',
                body: info,
            })
        }),
        sellerActivate: builder.mutation({
            query: (info) => ({
                url: 'activation',
                method: 'POST',
                body: info,
            }),
        }),
        sellerLogin: builder.mutation({
            query: (info) => ({
                url: 'login',
                method: 'POST',
                body: info,
            })
        }),
        sellerVerify: builder.query({
            query: () => ({
                url: 'verify',
            })
        })
    })
})

export const {
    useSellerRegisterMutation,
    useSellerActivateMutation,
    useSellerLoginMutation,
    useSellerVerifyQuery
} = sellerApi
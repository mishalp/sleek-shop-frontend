import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sellerApi = createApi({
    reducerPath: 'sellerApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/shop` }),
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
                credentials: 'include',
            }),
        }),
        sellerLogin: builder.mutation({
            query: (info) => ({
                url: 'login',
                method: 'POST',
                body: info,
                credentials: 'include'
            })
        }),
        sellerVerify: builder.query({
            query: () => ({
                url: 'verify',
                credentials: 'include'
            })
        })
    })
})

export const { useSellerRegisterMutation, useSellerActivateMutation, useSellerLoginMutation, useSellerVerifyQuery } = sellerApi
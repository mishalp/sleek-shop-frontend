import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/user` }),
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: (info) => ({
                url: 'register',
                method: 'POST',
                body: info,
            })
        }),
        userActivate: builder.mutation({
            query: (info) => ({
                url: 'activation',
                method: 'POST',
                body: info,
                credentials: 'include',
            }),
        }),
        userLogin: builder.mutation({
            query: (info) => ({
                url: 'login',
                method: 'POST',
                body: info,
                credentials: 'include'
            })
        }),
        userVerify: builder.query({
            query: () => ({
                url: 'verify',
                credentials: 'include'
            }),
        }),
    })
})

export const {
    useUserRegisterMutation,
    useUserActivateMutation,
    useUserLoginMutation,
    useUserVerifyQuery,
} = userApi
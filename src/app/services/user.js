import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/user`,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState().auth.userToken

            if (userToken) headers.set('authorization', `Bearer ${userToken}`)

            return headers
        },
    }),
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
            }),
        }),
        userLogin: builder.mutation({
            query: (info) => ({
                url: 'login',
                method: 'POST',
                body: info,
            }),
        }),
        userVerify: builder.query({
            query: () => ({
                url: 'verify',
            }),
            providesTags: ['User']
        }),
        changeUserPass: builder.mutation({
            query: (info) => ({
                url: 'change-password',
                method: 'PATCH',
                body: info,
            })
        }),
        updateUser: builder.mutation({
            query: (info) => ({
                url: 'update',
                method: 'PATCH',
                body: info,
            }),
            invalidatesTags: ['User']
        }),
        addAddress: builder.mutation({
            query: (info) => ({
                url: 'add-address',
                method: 'POST',
                body: { address: info },
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useUserRegisterMutation,
    useUserActivateMutation,
    useUserLoginMutation,
    useUserVerifyQuery,
    useChangeUserPassMutation,
    useUpdateUserMutation,
    useAddAddressMutation,
} = userApi
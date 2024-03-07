import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/payment` }),
    endpoints: (builder) => ({
        createIntent: builder.mutation({
            query: (amount) => ({
                url: 'create-intent',
                method: 'POST',
                body: { amount },
                credentials: 'include'
            })
        }),
    })
})

export const { useCreateIntentMutation } = paymentApi
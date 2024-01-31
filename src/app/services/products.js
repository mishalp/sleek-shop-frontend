import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/product` }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (info) => ({
                url: 'create',
                method: 'POST',
                body: info,
                credentials: 'include'
            })
        }),
    })
})

export const { useCreateProductMutation } = productApi
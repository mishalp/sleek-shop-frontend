import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/order` }),
    tagTypes: ['SellerOrder'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: 'create',
                method: 'POST',
                body: order,
                credentials: 'include'
            })
        }),
        getAllSellerOrder: builder.query({
            query: () => ({
                url: 'all-seller',
                credentials: 'include',
                providesTags: ({ orders }, error, arg) => {
                    return orders
                        ? [...orders.map((item) => ({ type: 'SellerOrder', id: item._id }))]
                        : ['SellerOrder']
                }
            })
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetAllSellerOrderQuery,
} = orderApi
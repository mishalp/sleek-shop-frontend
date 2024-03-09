import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/order`,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState().auth.userToken
            const sellerToken = getState().auth.sellerToken

            if (userToken) headers.set('authorization', `Bearer ${userToken}`)
            if (sellerToken) headers.set('seller', `Seller ${sellerToken}`)

            return headers
        },
    }),
    tagTypes: ['SellerOrder', 'UserOrder'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: 'create',
                method: 'POST',
                body: order,
            })
        }),
        getAllSellerOrder: builder.query({
            query: () => ({
                url: 'all-seller',
            }),
            providesTags: ({ orders }, error, arg) => {
                return orders
                    ? [...orders.map((item) => ({ type: 'SellerOrder', id: item._id }))]
                    : ['SellerOrder']
            }
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, value }) => ({
                url: `update-status/${id}`,
                body: { status: value },
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SellerOrder', id: arg.id }]
        }),
        getAllUserOrder: builder.query({
            query: () => ({
                url: 'all-user',
            }),
            providesTags: ({ orders }, error, arg) => {
                return orders
                    ? [...orders.map((item) => ({ type: 'UserOrder', id: item._id }))]
                    : ['UserOrder']
            }
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetAllSellerOrderQuery,
    useUpdateOrderStatusMutation,
    useGetAllUserOrderQuery,
} = orderApi
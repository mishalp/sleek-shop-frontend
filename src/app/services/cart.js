import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/cart`,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState().auth.userToken
            const sellerToken = getState().auth.sellerToken

            if (userToken) headers.set('authorization', `Bearer ${userToken}`)
            if (sellerToken) headers.set('seller', `Seller ${sellerToken}`)

            return headers
        },
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: `get`,
            }),
            // providesTags: ({ cart }, error, arg) => {
            //     return cart
            //         ? [...cart.map((item) => ({ type: 'Cart', id: item._id }))]
            //         : ['Cart']
            // }
        }),
        setCart: builder.mutation({
            query: (cart) => ({
                url: 'set-cart',
                method: 'POST',
                body: cart,
            }),
            // invalidatesTags: ({ cart }, error, arg) => {
            //     return cart
            //         ? [...cart.map((item) => ({ type: 'Cart', id: item._id }))]
            //         : ['Cart']
            // }
        }),
        incrementCart: builder.mutation({
            query: (id) => ({
                url: 'increment',
                method: 'PATCH',
                body: { id },
            }),
            // invalidatesTags: ({ cart }, error, arg) => {
            //     return cart
            //         ? [...cart.map((item) => ({ type: 'Cart', id: item._id }))]
            //         : ['Cart']
            // }
        }),
        decrementCart: builder.mutation({
            query: (id) => ({
                url: 'decrement',
                method: 'PATCH',
                body: { id },
            })
        }),
        addCartProduct: builder.mutation({
            query: (id) => ({
                url: 'add',
                method: 'PATCH',
                body: { id },
            })
        }),
        removeCartProduct: builder.mutation({
            query: (id) => ({
                url: 'remove',
                method: 'PATCH',
                body: { id },
            })
        }),
        incrementProdCount: builder.mutation({
            query: (id) => ({
                url: `increment`,
                method: 'PATCH',
                body: { id },
            })
        }),
        decrementProdCount: builder.mutation({
            query: (id) => ({
                url: `decrement`,
                method: 'PATCH',
                body: { id },
            })
        }),

    })
})

export const {
    useSetCartMutation,
    useIncrementCartMutation,
    useDecrementCartMutation,
    useAddCartProductMutation,
    useRemoveCartProductMutation,
    useIncrementProdCountMutation,
    useDecrementProdCountMutation,
    useGetCartQuery,
} = cartApi
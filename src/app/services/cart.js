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
        }),
        setCart: builder.mutation({
            query: (cart) => ({
                url: 'set-cart',
                method: 'POST',
                body: cart,
            }),
        }),
        incrementCart: builder.mutation({
            query: (id) => ({
                url: 'increment',
                method: 'PATCH',
                body: { id },
            }),
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
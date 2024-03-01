import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/cart` }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: `get`,
                credentials: 'include'
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
                credentials: 'include'
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
                credentials: 'include'
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
                credentials: 'include'
            })
        }),
        addCartProduct: builder.mutation({
            query: (id) => ({
                url: 'add',
                method: 'PATCH',
                body: { id },
                credentials: 'include'
            })
        }),
        removeCartProduct: builder.mutation({
            query: (id) => ({
                url: 'remove',
                method: 'PATCH',
                body: { id },
                credentials: 'include'
            })
        }),
        incrementProdCount: builder.mutation({
            query: (id) => ({
                url: `increment`,
                method: 'PATCH',
                body: { id },
                credentials: 'include'
            })
        }),
        decrementProdCount: builder.mutation({
            query: (id) => ({
                url: `decrement`,
                method: 'PATCH',
                body: { id },
                credentials: 'include'
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
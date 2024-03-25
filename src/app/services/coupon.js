import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/coupon`,
        prepareHeaders: (headers, { getState }) => {
            const userToken = getState().auth.userToken
            const sellerToken = getState().auth.sellerToken

            if (userToken) headers.set('authorization', `Bearer ${userToken}`)
            if (sellerToken) headers.set('seller', `Seller ${sellerToken}`)

            return headers
        },
    }),
    tagTypes: ['Coupon'],
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (order) => ({
                url: 'create',
                method: 'POST',
                body: order,
            })
        }),
        getAllCoupon: builder.query({
            query: () => ({
                url: 'all',
            })
        }),
    })
})

export const {
    useCreateCouponMutation,
    useGetAllCouponQuery,
} = couponApi
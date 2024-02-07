import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/product` }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (info) => ({
                url: 'create',
                method: 'POST',
                body: info,
                credentials: 'include'
            }),
            invalidatesTags: ['Products']
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: 'all-prodcuts',
            })
        }),
        getShopProdcuts: builder.query({
            query: (id) => ({
                url: `shop-products/${id}`,
            }),
            providesTags: ({ products }, error, arg) => {
                return products
                    ? [...products.map((item) => ({ type: 'Products', id: item._id }))]
                    : ['Products']
            }
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg }]
        }),
        editProduct: builder.mutation({
            query: (product) => ({
                url: `edit/${product.id}`,
                method: 'PATCH',
                body: product.data,
                credentials: 'include'
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetShopProdcutsQuery,
    useDeleteProductMutation,
    useEditProductMutation
} = productApi
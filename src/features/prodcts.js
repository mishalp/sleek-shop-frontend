import { createSlice } from "@reduxjs/toolkit"
import { products } from "../data"

const initialState = {
    loading: true,
    products: [...products],
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products
            state.loading = false
        },
        prodcutsFailed: (state) => {
            state.loading = false
        },
    }
})

export const {
    setProducts,
    prodcutsFailed,
} = productSlice.actions
export default productSlice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    isloading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push({ id: action.payload.id, count: 1 })
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {
            let index = state.cart.findIndex(item => item.id === action.payload.id)
            state.cart.splice(index, 1)
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(state))
        },
        emptyCart: (state) => {
            state = []
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify([]))
        },
        setCart: (state, action) => {
            console.log(action.payload);
            state.cart = action.payload.cart
            state.isloading = false
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(action.payload.cart))
        },
    }
})

export const { addToCart, removeFromCart, setCart } = cartSlice.actions
export default cartSlice

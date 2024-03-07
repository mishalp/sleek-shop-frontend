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
            state.cart.push({ item: action.payload.item, count: 1 })
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {
            let index = state.cart.findIndex(item => item.item._id === action.payload.id)
            state.cart.splice(index, 1)
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(state))
        },
        emptyCart: (state) => {
            state = []
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify([]))
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart
            state.isloading = false
            if (!action.payload.user) localStorage.setItem('cart', JSON.stringify(action.payload.cart))
        },
        incrementCount: (state, action) => {
            state.cart.map((item) => {
                if (item.item._id === action.payload.id && item.count < item.item.stock) {
                    item.count++
                }
                return item
            })
        },
        decrementCount: (state, action) => {
            state.cart.map((item) => {
                if (item.item._id === action.payload.id && item.count != 1) {
                    item.count--
                }
                return item
            })
        },
    }
})

export const { addToCart, removeFromCart, setCart, incrementCount, decrementCount } = cartSlice.actions
export default cartSlice

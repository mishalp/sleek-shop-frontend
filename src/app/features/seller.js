import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    info: null,
    token: null,
    isAuthenticated: false,
    loading: true
}


const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setSeller: (state, action) => {
            state.info = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            state.loading = false
        },
        sellerFailed: (state) => {
            state.loading = false
        }
    }
})

export const { setSeller, sellerFailed } = sellerSlice.actions
export default sellerSlice
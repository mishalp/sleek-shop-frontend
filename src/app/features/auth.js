import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    userToken: JSON.parse(localStorage.getItem("sleek_token")),
    sellerToken: JSON.parse(localStorage.getItem("sleek_seller_token"))
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.userToken = action.payload.token
        },
        setSellerToken: (state, action) => {
            state.sellerToken = action.payload.token
        }
    }
})

export const { setUserToken, setSellerToken } = authSlice.actions
export default authSlice
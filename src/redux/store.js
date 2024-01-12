import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/prodcts";


export const store = configureStore({
    reducer: {
        products: productSlice.reducer
    }
})
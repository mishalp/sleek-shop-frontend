import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/prodcts";
import sellerSlice from "../features/seller";
import { sellerApi } from "./services/seller";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        seller: sellerSlice.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sellerApi.middleware)
})
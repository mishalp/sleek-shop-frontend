import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/prodcts";
import sellerSlice from "../features/seller";
import { sellerApi } from "./services/seller";
import { productApi } from "./services/products";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        seller: sellerSlice.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        sellerApi.middleware,
        productApi.middleware
    )
})
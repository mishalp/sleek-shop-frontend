import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/prodcts";
import sellerSlice from "../features/seller";
import { sellerApi } from "./services/seller";
import { productApi } from "./services/products";
import { userApi } from "./services/user";
import cartSlice from "@/features/cart";
import { cartApi } from "./services/cart";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        seller: sellerSlice.reducer,
        cart: cartSlice.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        sellerApi.middleware,
        productApi.middleware,
        userApi.middleware,
        cartApi.middleware,
    )
})
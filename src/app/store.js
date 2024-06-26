import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/app/features/cart";
import { cartApi } from "./services/cart";
import { sellerApi } from "./services/seller";
import { productApi } from "./services/products";
import { userApi } from "./services/user";
import { paymentApi } from "./services/payment";
import { orderApi } from "./services/order";
import authSlice from "./features/auth";
import { couponApi } from "./services/coupon";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        sellerApi.middleware,
        productApi.middleware,
        userApi.middleware,
        cartApi.middleware,
        paymentApi.middleware,
        orderApi.middleware,
        couponApi.middleware,
    )
})
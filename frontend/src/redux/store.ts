import { configureStore } from "@reduxjs/toolkit"
import { CartSlice } from "./slices/product.slice.ts"
import { AuthSlice } from "./slices/auth.slice.ts"
import { ProductsAPI } from "./services/product.service.ts"
import { AuthAPI } from "./services/auth.service.ts"

export const store = configureStore({
    reducer: {
        [ProductsAPI.reducerPath]: ProductsAPI.reducer,
        [AuthAPI.reducerPath]: AuthAPI.reducer,
        cart: CartSlice.reducer,
        auth: AuthSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductsAPI.middleware, AuthAPI.middleware)
})


//
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

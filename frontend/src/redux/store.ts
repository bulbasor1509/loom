import {configureStore} from "@reduxjs/toolkit"
import {CartSlice} from "./slices/product.slice.ts"
import {ProductsAPI} from "./services/product.service.ts"

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        [ProductsAPI.reducerPath]: ProductsAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductsAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

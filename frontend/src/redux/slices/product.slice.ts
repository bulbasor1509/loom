import {createSlice}  from "@reduxjs/toolkit"
import type {CartItemType} from "@/types/cart.types.ts"

function loadItemsFromStorage() : CartItemType[] {
    const cart = localStorage.getItem("cart")
    if(cart === null){
        return []
    }
    return JSON.parse(cart)
}

const cartState: CartItemType[] = loadItemsFromStorage()

export const CartSlice = createSlice({
    name: "cart",
    initialState: cartState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existing = state.find(i => i.productId === item.productId)

            if (existing) {
                existing.quantity += item.quantity
            } else {
                state.push(item)
                localStorage.setItem("cart", JSON.stringify(state))
            }
        },
        removeFromCart: (state, action) => {
            state = state.filter(i => i.productId !== action.payload)
            localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})

export const {addToCart, removeFromCart} = CartSlice.actions

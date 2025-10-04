import type {AuthType} from "@/types/user.type.ts"
import {createSlice} from "@reduxjs/toolkit"


const authState:AuthType = {
    token: null
}



export const AuthSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        setToken(state, action) {
            const {token} = action.payload
            state.token = token
        },
        clearToken(state) {
            state.token = null
        }
    }
})
export const {setToken, clearToken } = AuthSlice.actions
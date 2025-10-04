import type {AuthType} from "../../types/user.type.ts";
import {createSlice} from "@reduxjs/toolkit";

const authState:AuthType = {
    token: null
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        setToken(state, action) {
            localStorage.setItem("persist", "true")
            state.token = action.payload
        },
        clearToken(state) {
            localStorage.setItem("persist", "false")
            state.token = null
        },
    }
})
export const {setToken, clearToken } = AuthSlice.actions
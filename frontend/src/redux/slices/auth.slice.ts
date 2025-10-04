import type {AuthType} from "../../types/user.type.ts"
import {createSlice} from "@reduxjs/toolkit"

function loadAuthStateFromStorage(){
    return localStorage.getItem("persist") === "true"
}

const authState:AuthType = {
    persist: loadAuthStateFromStorage()
}



export const AuthSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        setToken(state) {
            state.persist = true
            localStorage.setItem("persist", "true")
        },
        clearToken(state) {
            state.persist = false
            localStorage.setItem("persist", "false")
        },
    }
})
export const {setToken, clearToken } = AuthSlice.actions
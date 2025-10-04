import {createSlice} from "@reduxjs/toolkit";
import type {PersistType} from "@/types/user.type.ts";

const persistState: PersistType = {
    persist: JSON.parse(localStorage.getItem("persist") as string) || false,
}

export const PersistSlice = createSlice({
    name: "persist",
    initialState: persistState,
    reducers: {
        setPersist(state, action) {
            state.persist = action.payload
            localStorage.setItem("persist", JSON.stringify(state.persist))
        }
    }
})

export const {setPersist} = PersistSlice.actions
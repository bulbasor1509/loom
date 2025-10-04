import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../../types/store.type";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {clearToken, setToken} from "@/redux/slices/auth.slice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            console.log(token)
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const BaseQueryWithReauth:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, store, extraOptions) => {
    let result = await baseQuery(args, store, extraOptions)
    const authState = (store.getState() as RootState).auth
    if (result.error && result.error.status === 401){
        if (!authState.token) return result
        store.dispatch(setToken(authState.token))

        const refreshToken = await baseQuery({
            url: "/user/refresh",
        },store, extraOptions)

        if (refreshToken.data){
            store.dispatch(setToken(refreshToken.data))
            result = await baseQuery(args, store, extraOptions)
        } else {
            store.dispatch(clearToken())
        }
    }
    return result
}


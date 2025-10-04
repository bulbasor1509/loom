import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../../types/store.type";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {setToken} from "../slices/auth.slice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState() as RootState
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const BaseQueryWithReauth:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401){
        const refreshToken = await baseQuery({
            url: "/user/refresh",
        },api, extraOptions)

        if (refreshToken?.data){
            api.dispatch(setToken(refreshToken.data))
        } else {
            api.dispatch(setToken(null))
        }
    }
    return result
}


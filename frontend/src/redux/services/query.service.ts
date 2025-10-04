import { fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {type RootState} from "../../types/store.type.ts"
import Cookies from "js-cookie"
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {setToken} from "../slices/auth.slice.ts";

export const RawBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/user",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token || Cookies.get("token")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args, api, extraOptions) =>{
    let result = await RawBaseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401){
        const refreshResult = await RawBaseQuery(
            { url: "/refresh", method: "GET" },
            api,
            extraOptions
        )

        if (refreshResult?.data) {
            api.dispatch(setToken((refreshResult.data)))
            result = await RawBaseQuery(args, api, extraOptions)
        } else {
            api.dispatch(setToken(null))
        }
    }
    return result
}

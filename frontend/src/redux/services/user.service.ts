import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {SignInAPIResponseType, SignInRequestType} from "../../types/user.type.ts";
import {setToken} from "../slices/auth.slice.ts"


export const UserAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/"}),
    endpoints: (builder) => ({
        signIn: builder.query<string | null,SignInRequestType>({
            query: (credentials: SignInRequestType) => ({
                url: "user/signin",
                method: "POST",
                body: credentials
            }),
            transformResponse(response: SignInAPIResponseType) {
                if (response.status === 200) {
                    return response.data.token
                } else {
                    return null
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}){
               const {data} = await queryFulfilled
                dispatch(setToken(data))
            }
        })
    })
})
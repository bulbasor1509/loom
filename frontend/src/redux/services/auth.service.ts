import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReauth} from "./query.service.ts";
import type {
    SignInAPIResponseType,
    SignInRequestType,
    SignUpAPIResponseType,
    SignUpRequestType
} from "../../types/user.type.ts";
import {setToken} from "../slices/auth.slice.ts";


export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    baseQuery: BaseQueryWithReauth,
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInAPIResponseType,SignInRequestType>({
            query: (credentials: SignInRequestType) => ({
                url: "user/signin",
                credentials: "include",
                method: "POST",
                body: credentials
            }),
            async onQueryStarted(_, {dispatch}){
                // const {data} = await queryFulfilled
                dispatch(setToken())
            }
        }),
        signUp: builder.mutation<SignUpAPIResponseType,SignUpRequestType>({
            query: (credentials: SignUpRequestType) => ({
                url: "user/signup",
                method: "POST",
                credentials: "include",
                body: credentials
            })
        }),
    })
})

export const {useSignInMutation, useSignUpMutation} = AuthAPI
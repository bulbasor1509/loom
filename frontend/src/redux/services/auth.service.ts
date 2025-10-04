import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReauth} from "./query.service.ts";
import type {
    SignInAPIResponseType,
    SignInRequestType,
    SignUpAPIResponseType,
    SignUpRequestType
} from "@/types/user.type.ts";
import {clearToken, setToken} from "@/redux/slices/auth.slice.ts";
import {setPersist} from "@/redux/slices/persist.slice.ts";
// import {clearToken, setToken} from "../slices/auth.slice.ts";


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
            // async onQueryStarted(_, {dispatch}){
            //     // const {data} = await queryFulfilled
            //     // dispatch(setToken())
            // }
        }),
        signUp: builder.mutation<SignUpAPIResponseType,SignUpRequestType>({
            query: (credentials: SignUpRequestType) => ({
                url: "user/signup",
                method: "POST",
                credentials: "include",
                body: credentials
            })
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: "user/logout",
                credentials: "include"
            }),
            async onQueryStarted(_, {dispatch}){
                // const {data} = await queryFulfilled
                dispatch(clearToken())
                dispatch(setPersist(false))
            }
        }),
        refresh: builder.mutation<SignUpAPIResponseType, void>({
            query: () => ({
                url: "user/refresh"
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled
                    const token = data.data
                    dispatch(setToken(token))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {useSignInMutation, useSignUpMutation, useLogOutMutation, useRefreshMutation} = AuthAPI
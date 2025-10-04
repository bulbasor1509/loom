import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
    SignInAPIResponseType,
    SignInRequestType,
    SignUpAPIResponseType,
    SignUpRequestType,
} from "../../types/user.type.ts";
import Cookies from "js-cookie"
import {setToken} from "../slices/auth.slice.ts";
import type {RootState} from "../store.ts";


export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
        }
    }),
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInAPIResponseType,SignInRequestType>({
            query: (credentials: SignInRequestType) => ({
                url: "user/signin",
                credentials: "include",
                method: "POST",
                body: credentials
            }),
            transformResponse(response: SignInAPIResponseType) {
                if (response.status === 200) {
                    Cookies.set("token", response.data.token, {expires: 1})
                }
                return response
            },
            // async onQueryStarted(_, {dispatch, queryFulfilled}){
            //    const {data} = await queryFulfilled
            //     dispatch(setToken(data))
            // }
        }),
        signUp: builder.mutation<SignUpAPIResponseType,SignUpRequestType>({
            query: (credentials: SignUpRequestType) => ({
                url: "user/signup",
                method: "POST",
                credentials: "include",
                body: credentials
            }),
            transformResponse(response: SignUpAPIResponseType){
                if(response.status === 200) {
                    Cookies.set("token", response.data.token, {expires: 1})
                }
                return response
            }
        }),
        tokenRefresh: builder.mutation<SignInAPIResponseType, void>({
            query: () => ({
                url: "user/refresh",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
               const {data} = await queryFulfilled
                dispatch(setToken(data.data.token))
            }
        }),
    })
})

export const {useSignInMutation, useSignUpMutation, useTokenRefreshMutation} = AuthAPI
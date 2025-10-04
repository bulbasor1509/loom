import {createApi} from "@reduxjs/toolkit/query/react"
// import {type RootState} from "../../types/store.type.ts"
// import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {setToken} from "../slices/auth.slice.ts";
import type {
    SignInAPIResponseType,
    SignInRequestType,
    SignUpAPIResponseType,
    SignUpRequestType
} from "../../types/user.type.ts";
import Cookies from "js-cookie";
import {baseQueryWithReauth} from "./query.service.ts";


//
// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://localhost:3000/user",
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//         const token = (getState() as RootState).auth.token || Cookies.get("token")
//         if (token) {
//             headers.set("Authorization", `Bearer ${token}`)
//         }
//         return headers
//     }
// })

// export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//     args, api, extraOptions) =>{
//     let result = await baseQuery(args, api, extraOptions)
//
//     if (result.error && result.error.status === 401){
//         const refreshResult = await baseQuery(
//             { url: "/refresh", method: "GET" },
//             api,
//             extraOptions
//         )
//
//         if (refreshResult?.data) {
//             api.dispatch(setToken((refreshResult.data)))
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(setToken(null))
//         }
//     }
//     return result
// }

export const AuthAPI = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) =>({
        signIn: builder.mutation<SignInAPIResponseType, SignInRequestType>({
            query: (credentials) => ({
                url: "signin",
                method: "POST",
                credentials: "include",
                body: credentials,
            }),
            transformResponse(response: SignInAPIResponseType) {
                if (response.status === 200) {
                    Cookies.set("token", response.data.token, { expires: 1 });
                }
                return response;
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setToken(data.data.token));
            },
        }),
        signUp: builder.mutation<SignUpAPIResponseType, SignUpRequestType>({
            query: (credentials) => ({
                url: "signup",
                method: "POST",
                credentials: "include",
                body: credentials,
            }),
            transformResponse(response: SignUpAPIResponseType) {
                if (response.status === 200) {
                    Cookies.set("token", response.data.token, { expires: 1 });
                }
                return response;
            },
        }),
    })

})

export const { useSignInMutation, useSignUpMutation } = AuthAPI;


// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import type {
//     SignInAPIResponseType,
//     SignInRequestType,
//     SignUpAPIResponseType,
//     SignUpRequestType,
// } from "../../types/user.type.ts";
// import Cookies from "js-cookie"
// import {setToken} from "../slices/auth.slice.ts";
// import type {RootState} from "../store.ts";
//
//
// export const AuthAPI = createApi({
//     reducerPath: "AuthAPI",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:3000/user",
//         credentials: "include",
//         prepareHeaders: (headers, {getState}) => {
//             const token = (getState() as RootState).auth.token
//             if (token) {
//                 headers.set("Authorization", `Bearer ${token}`)
//             }
//             return headers
//         }
//     }),
//     endpoints: (builder) => ({
//         signIn: builder.mutation<SignInAPIResponseType,SignInRequestType>({
//             query: (credentials: SignInRequestType) => ({
//                 url: "signin",
//                 credentials: "include",
//                 method: "POST",
//                 body: credentials
//             }),
//             transformResponse(response: SignInAPIResponseType) {
//                 if (response.status === 200) {
//                     Cookies.set("token", response.data.token, {expires: 1})
//                 }
//                 return response
//             },
//             // async onQueryStarted(_, {dispatch, queryFulfilled}){
//             //    const {data} = await queryFulfilled
//             //     dispatch(setToken(data))
//             // }
//         }),
//         signUp: builder.mutation<SignUpAPIResponseType,SignUpRequestType>({
//             query: (credentials: SignUpRequestType) => ({
//                 url: "signup",
//                 method: "POST",
//                 credentials: "include",
//                 body: credentials
//             }),
//             transformResponse(response: SignUpAPIResponseType){
//                 if(response.status === 200) {
//                     Cookies.set("token", response.data.token, {expires: 1})
//                 }
//                 return response
//             }
//         }),
//         tokenRefresh: builder.mutation<SignInAPIResponseType, void>({
//             query: () => ({
//                 url: "refresh",
//                 method: "GET",
//                 credentials: "include",
//             }),
//             transformResponse(response: SignUpAPIResponseType){
//                 if(response.status === 401) {
//                     Cookies.set("token", response.data.token, {expires: 1})
//                 }
//                 return response
//             },
//             async onQueryStarted(_, {dispatch, queryFulfilled}){
//                const {data} = await queryFulfilled
//                 dispatch(setToken(data.data.token))
//             }
//         }),
//     })
// })
//
// export const {useSignInMutation, useSignUpMutation, useTokenRefreshMutation} = AuthAPI
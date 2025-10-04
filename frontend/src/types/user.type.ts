import type {APIResponseType} from "./response.type.ts";

export interface SignUpRequestType {
    email: string
    password: string
    name: string
}
export interface SignUpResponseType{
    data: {
        token: string
    }
}
export type SignUpAPIResponseType = SignUpResponseType & APIResponseType

export type SignInRequestType = Omit<SignUpRequestType, "name">
export interface SignInResponseType {
    data: {
        token: string
    }
}
export type SignInAPIResponseType = SignInResponseType & APIResponseType

export interface AuthType {
    persist: boolean
}


import type {APIResponseType} from "./response.type.ts";

export interface AuthType {
    token: string | null
}

export interface SignInRequestType {
    email: string,
    password: string
}

export interface SignInResponseType {
    data: {
        token: string
    }
}

export type SignInAPIResponseType = SignInResponseType & APIResponseType


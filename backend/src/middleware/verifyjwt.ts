import jwt from "jsonwebtoken"
import type {Request, Response, NextFunction} from "express"
import {APIResponse} from "../helpers/response.js";
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "../helpers/token.js";
import type {DecodedTokenType} from "../controllers/auth.controller.js";

const apiResponse = new APIResponse()

export function verifyJWTMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
        apiResponse.failureReturn({
            response: response,
            status: 401,
            message: "header not set"
        })
    } else {
        const token = authHeader.split("Bearer ")[1] as string
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                apiResponse.failureReturn({
                    response: response,
                    status: 403,
                    message: "invalid token"
                })
            }
            // request.email = (decoded as DecodedTokenType).UserInfo.email
            console.log(decoded)
            next()
        })
    }

}
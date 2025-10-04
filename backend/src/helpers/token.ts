import jwt from "jsonwebtoken"

export const ACCESS_TOKEN_SECRET = "ACCESS_TOKEN"
export const REFRESH_TOKEN_SECRET = "SECRET_TOKEN"

export function generateAccessToken(userId: string, email: string){
    return jwt.sign({
        userId,
        email,
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: "10s"
    })
}

export function generateRefreshToken(userId: string, email: string){
    return jwt.sign({
        userId,
        email,
    }, REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    })
}


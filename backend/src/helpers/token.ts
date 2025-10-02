import jwt from "jsonwebtoken"

const secret = "SECRET"

export function generateToken(userId: string, email: string){
    return jwt.sign({
        userId,
        email,
    }, secret, {
        expiresIn: "1d"
    })
}
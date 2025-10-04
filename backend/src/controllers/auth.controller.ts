import {raw, type Request, type Response} from "express"
import User from "../schema/user.schema.js"
import {compareUserPassword, hashUserPassword} from "../helpers/hash.js"
import {generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET} from "../helpers/token.js"
import {APIResponse} from "../helpers/response.js"
import {serialize} from "cookie"
import jwt, {type JwtPayload} from "jsonwebtoken";

export interface DecodedTokenType extends JwtPayload {
    userId: string
    email: string
}

const apiResponse = new APIResponse()

export async function signUpController(request: Request, response: Response) {
    try{
        const {email, password, name} = request.body
        const isExist = await User.findOne({email})
        if (isExist) {
            apiResponse.successReturn({
                status: 409,
                response: response,
                data: [],
                message: "user is already exist"
            })
        }
        const hashedPassword = await hashUserPassword(password)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        await user.save()
        apiResponse.successReturn({
            response: response,
            status: 201,
            data: user,
            message: "user created successfully"
        })
    } catch (err){
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message
        })
    }
}

export async function signInController(request: Request, response: Response) {
    try{
        const cookies =request.cookies
        const {email, password} = request.body
        const user = await User.findOne({email})
        if(!user){
            apiResponse.failureReturn({
                response: response,
                status:401,
                message: "user not found"
            })
        } else{
            const match = await compareUserPassword(password, user.password)
            if (!match){
                apiResponse.failureReturn({
                    response: response,
                    status: 401,
                    message: "invalid credentials"
                })
            }
            const accessToken = generateAccessToken(user._id.toString(), email)
            const newRefreshToken = generateRefreshToken(user._id.toString(), email)
            if (cookies?.token) {
                const refreshToken = cookies.token as string
                const tokenMatches = refreshToken === user.refreshToken
                if (!tokenMatches) {
                    user.refreshToken = ""
                }
                response.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true})
            }
            user.refreshToken = newRefreshToken
            await user.save()
            response.cookie("token", newRefreshToken, {httpOnly: true, sameSite: "none", secure: true})
            apiResponse.successReturn({
                response: response,
                status: 200,
                data: {
                    token: accessToken
                },
                message: "user logged in successfully"
            })
        }
    } catch (err){
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message
        })
    }
}

async function verifyTokenSafe(token: string){
    return new Promise(resolve => {
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return resolve(null)
            resolve(decoded as jwt.JwtPayload)
        })
    })
}

export async function refreshTokenController(request: Request, response: Response) {
    try {
        const cookies = request.cookies
        if (!cookies) {
            apiResponse.failureReturn({
                response: response,
                status:401,
                message: "cookie not found"
            })
        }
        const refreshToken = cookies.refreshToken
        response.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true})
        const foundUser = await User.findOne({refreshToken})

        if (!foundUser) {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
                if (err) {
                    apiResponse.failureReturn({
                        response: response,
                        status: 403,
                        message: "forbidden"
                    })
                    const { email } = decoded as DecodedTokenType
                    const hackedUser = await User.findOne({email})
                    if (hackedUser) {
                        hackedUser.refreshToken = ""
                        const result = await hackedUser.save()
                    }
                }
            })
            apiResponse.failureReturn({
                response: response,
                status: 403,
                message: "forbidden"
            })
        } else {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
                if (err) {
                    foundUser.refreshToken = ""
                    await foundUser.save()
                    apiResponse.failureReturn({
                        response: response,
                        status: 403,
                        message: "forbidden"
                    })
                }
                const { email } = decoded as DecodedTokenType
                if (err || foundUser.email !== email) {
                    apiResponse.failureReturn({
                        response: response,
                        status: 403,
                        message: "forbidden"
                    })
                }

                const accessToken = generateAccessToken(foundUser._id.toString(), email)
                const newRefreshToken = generateRefreshToken(foundUser._id.toString(), email)
                foundUser.refreshToken = newRefreshToken
                await foundUser.save()
                response.cookie("token", newRefreshToken, {httpOnly: true, sameSite: "none", secure: true})
                apiResponse.successReturn({
                    response: response,
                    status: 200,
                    data: {
                        token: accessToken
                    },
                    message: "access token revalidated"
                })
            })
        }
    } catch (err){
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message
        })
    }
}
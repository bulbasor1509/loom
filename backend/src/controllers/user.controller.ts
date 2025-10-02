import type {Request, Response} from "express"
import User from "../schema/user.schema.js"
import {compareUserPassword, hashUserPassword} from "../helpers/hash.js"
import {generateToken} from "../helpers/token.js"
import {APIResponse} from "../helpers/response.js"

const apiResponse = new APIResponse()

export async function signUpController(request: Request, response: Response) {
    try{
        const {email, password} = request.body
        const hashedPassword = await hashUserPassword(password)
        const user = await User.create({
            email,
            password: hashedPassword,
        })
        await user.save()
        const token = generateToken(user._id.toString(), email)
        apiResponse.successReturn({
            response: response,
            status: 201,
            data: {
                token: token
            },
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
        const {email, password} = request.body
        const user = await User.findOne({
            email,
        })
        if(!user){
            apiResponse.failureReturn({
                response: response,
                status:404,
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
                return
            }
            const token = generateToken(user._id.toString(), email);
            apiResponse.successReturn({
                response: response,
                status: 200,
                data: {
                    token: token
                },
                message: "user signin successfully"
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
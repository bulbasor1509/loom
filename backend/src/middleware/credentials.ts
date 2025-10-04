import type {Request, Response, NextFunction} from "express"

export function credentialsMiddleware(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Credentials", "true")
    next()
}
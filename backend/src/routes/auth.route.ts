import express from "express"
import {refreshTokenController, signInController, signUpController} from "../controllers/auth.controller.js"

export const UserRouter = express.Router()

UserRouter.post("/signup", signUpController)
UserRouter.post("/signin", signInController)
UserRouter.get("/refresh", refreshTokenController)
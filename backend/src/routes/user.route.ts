import express from "express"
import {signInController, signUpController} from "../controllers/user.controller.js"

export const UserRouter = express.Router()

UserRouter.post("/signup", signUpController)
UserRouter.post("/signin", signInController)
import express, {type Request, type Response} from "express"
import Product from "../schema/product.schema.js"
import {APIResponse} from "../response/response.js";

export const ProductsRouter = express.Router()
const apiResponse = new APIResponse()

ProductsRouter.get("/", async (request: Request, response: Response) => {
    try{
        const products = await Product.find({})
        apiResponse.successReturn({
            response: response,
            status: 200,
            data: products,
            message: "data send successfully"
        })

    } catch (err){
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message,
        })
    }
})
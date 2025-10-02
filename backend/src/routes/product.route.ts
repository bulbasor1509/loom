import express, {type Request, type Response} from "express"
import Product from "../schema/product.schema.js"
import {APIResponse} from "../response/response.js";

export const ProductsRouter = express.Router()
const apiResponse = new APIResponse()

ProductsRouter.get("/", async (request: Request, response: Response) => {
    try{
        const gender = request.query.gender
        const products = await Product.find({
            gender: gender
        })
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

ProductsRouter.get("/:productId", async (request: Request, response: Response) => {
    try {
        const productId = request.params.productId
        const product = await Product.findById({
            _id: productId
        })
        apiResponse.successReturn({
            response: response,
            status: 200,
            data: product,
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
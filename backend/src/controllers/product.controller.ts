import type {Request, Response} from "express"
import Product from "../schema/product.schema.js"
import {APIResponse} from "../response/response.js"
import {createInventoryController} from "./inventory.controller.js";

const apiResponse = new APIResponse()

export async function getAllProductsController(request: Request, response: Response) {
    try{
        const gender = request.query.gender
        if(gender === undefined){
            const products = await Product.find({})
            apiResponse.successReturn({
                response: response,
                status: 200,
                data: products,
                message: "data send successfully"
            })
        } else {
            const products = await Product.find({
                gender: gender,
            })
            apiResponse.successReturn({
                response: response,
                status: 200,
                data: products,
                message: "data send successfully"
            })
        }
    } catch (err){
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message,
        })
    }
}

export async function createProductController(request: Request, response: Response) {
    try {
        const product = request.body
        const newProduct = new Product({
            name: product.name,
            image: product.image,
            coverImage: product.coverImage,
            description: product.description,
            price: product.price,
            gender: product.gender,
            category: product.category,
            inventory: [],
        })
        await newProduct.save()

        const error = await createInventoryController(newProduct._id)
        if(typeof error === "string"){
            apiResponse.failureReturn({
                response: response,
                status: 404,
                message: error
            })
        }

        apiResponse.successReturn({
            response: response,
            status: 200,
            data: newProduct,
            message: "product created successfully"
        })
    } catch (err) {
        apiResponse.failureReturn({
            response: response,
            status: 404,
            message: (err as Error).message,
        })
    }
}

export async function getProductByIdController(request: Request, response: Response){
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

}
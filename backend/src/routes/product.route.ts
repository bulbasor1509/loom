import express, {type Request, type Response} from "express"
import {
    createProductController,
    getAllProductsController,
    getProductByIdController
} from "../controllers/product.controller.js";


export const ProductsRouter = express.Router()

ProductsRouter.get("/", getAllProductsController)

ProductsRouter.post("/", createProductController)

ProductsRouter.get("/:productId",getProductByIdController)
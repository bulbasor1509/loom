import express, {type Request, type Response} from "express"
import Product from "../schema/product.schema.js"
import {APIResponse} from "../response/response.js"
import ProductInventory from "../schema/inventory.schema.js";
import productSchema from "../schema/product.schema.js";
import {
    createProductController,
    getAllProductsController,
    getProductByIdController
} from "../controllers/product.controller.js";

const inventorySizes = ["SM", "M", "L", "XL", "XXL"]

export const ProductsRouter = express.Router()

ProductsRouter.get("/", getAllProductsController)

ProductsRouter.post("/", createProductController)

ProductsRouter.get("/:productId",getProductByIdController)
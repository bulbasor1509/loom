import express from "express";
import Product from "../schema/product.schema.js";
import { APIResponse } from "../response/response.js";
export const ProductsRouter = express.Router();
const apiResponse = new APIResponse();
ProductsRouter.get("/", async () => {
    try {
        const products = await Product.find({});
        return apiResponse.successReturn({
            status: 200,
            data: products,
            message: "data send successfully"
        });
    }
    catch (err) {
        return apiResponse.failureReturn({
            status: 404,
            message: err.message,
        });
    }
});
//# sourceMappingURL=product.route.js.map
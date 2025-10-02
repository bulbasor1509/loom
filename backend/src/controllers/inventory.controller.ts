import ProductInventory from "../schema/inventory.schema.js"
import Product from "../schema/product.schema.js"
import {type Document, Types} from "mongoose";


const inventorySizes = ["SM", "M", "L", "XL", "XXL"]

export async function createInventoryController(productId: Types.ObjectId){
    const productInventoryIDs = []
    try {
        for(let size of inventorySizes){
            const productSize = await ProductInventory.create({
                product: productId,
                size: size,
                quantity: 0,
            })
            await Product.findByIdAndUpdate(productId, {
                $push: {
                    inventory: {
                        ...productSize,
                    },
                }
            }, {new: true, useFindAndModify: false})
        }
       return
    } catch (err) {
        return (err as Error).message
    }
}
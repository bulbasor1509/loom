import mongoose from "mongoose"

const ProductInventorySchema = new mongoose.Schema({
    size: {
        type: String,
        enum: ["SM", "M", "L", "XL", "XXL"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
})

const ProductInventory = mongoose.model("ProductInventory", ProductInventorySchema)
export default ProductInventory


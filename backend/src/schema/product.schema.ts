import mongoose from "mongoose"

const ProductSchema  = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    coverImage: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    // quantity: {type: Number, required: true},
    gender: {
        type: String,
        enum: ["men", "woman"],
        required: true
    },
    category: {
        type: String,
        enum: ["t-shirt", "shirt", "polo shirt", "trouser", "denim", "hoodie"],
        required: true
    },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInventory"
    }],
}, {
    timestamps: true,
})

const Product = mongoose.model("Product", ProductSchema)
export default Product
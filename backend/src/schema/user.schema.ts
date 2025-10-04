import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    pincode: {type: String},
    address: {type: String},
    landmark: {type: String},
    locality: {type: String},
    city: {type: String},
    state: {type: String},
    phone: {type: String},
    refreshToken: {type: String},
})

const User = mongoose.model("User", UserSchema)
export default User
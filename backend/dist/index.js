import express, {} from "express";
import mongoose from "mongoose";
import { ProductsRouter } from "./routes/product.route.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/products", ProductsRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        "message": "hello world"
    });
});
function mongodbInit() {
    mongoose.connect("mongodb://root:root@localhost:27017/loom?authSource=admin")
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));
}
mongodbInit();
app.listen(PORT, () => {
    console.log(`server is running on port 3000`);
});
//# sourceMappingURL=index.js.map
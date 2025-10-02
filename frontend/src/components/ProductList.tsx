import Product from "./Product"
import type {ProductType} from "../types/product.types.ts"

const ProductList = ({products}:{products: ProductType[]}) => {
    return (
        <>
            <div className="px-12 py-8 uppercase">
                <div className="text-2xl my-4">
                    Trending Products
                </div>
                <div className="flex flex-wrap gap-8">
                    {
                        products && products.map((product: ProductType) => (
                           <Product product={product}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList;
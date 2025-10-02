import {Link} from "react-router";
import type {ProductType} from "../types/product.types.ts"

const Product = ({product}: {product: ProductType}) => {
    return(
        <>
            <Link to={`/${product.gender}/${product._id}`} className="w-[18rem] h-[28rem]">
                <img
                    src={product.image}
                    className="w-full h-11/12 object-cover"
                    alt={product.name}
                 />
                <div className="h-1/12 text-xs font-light uppercase mt-2">
                    <div>
                        {product.name}
                    </div>
                    <div>
                        Rs. {product.price}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Product;

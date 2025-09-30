import Product from "./Product"

const ProductList = () => {
    return (
        <>
            <div className="px-12 py-8 uppercase">
                <div className="text-2xl my-4">
                    Trending Products
                </div>
                <div className="flex gap-8 mb-4">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        </>
    )
}

export default ProductList;
import {useSelector} from "react-redux"
import type {RootState} from "./redux/store.ts"
import type {CartItemType} from "./types/cart.types.ts"
import {useGetAllProductsQuery} from "./redux/services/product.service.ts"

const Cart = () => {
    const cartItems = useSelector<RootState, CartItemType[]>(state => state.cart)
    const {data: allProducts} = useGetAllProductsQuery()
    // const dispatch = useDispatch<AppDispatch>()
    // console.log(dispatch)
   const cartItemDetails = cartItems.map((item: CartItemType) => {
       if(allProducts){
           const product = allProducts.find(prod => prod._id === item.productId)
           if(product){
               return {
                   ...product,
                   quantity: item.quantity,
               }
           }
       }
       return null
   }).filter(item => item !== null)

    console.log(cartItemDetails)

    const cartPrice = cartItemDetails.reduce(
        (acc, curr) => {
            return acc + curr.quantity * curr.price
        }, 0
    )


    return (
        <>
            <div className="font-light mt-15 px-12 min-h-[80dvh] flex justify-betwen items-center">
                {
                    cartItems.length >0 ? (
                        <div>

                        </div>
                    ): (
                        <div className="uppercase text-lg w-full h-3/5 text-center">
                            <div>
                                your basket is empty
                            </div>
                            <div className="text-xs normal-case">
                                The items you add will be shown here
                            </div>
                        </div>
                    )
                }
                <div>
                    {cartPrice}
                </div>
            </div>
        </>
    )
}

export default Cart
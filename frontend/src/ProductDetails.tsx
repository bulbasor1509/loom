// import {useParams} from "react-router";
import { Button } from "./components/ui/button"

const ProductDetails = () => {
    // const {category, productId} = useParams()
    return(
        <>
            <div className="mt-20 flex gap-16 px-12">
                <div
                    className="w-1/2 h-[45rem] bg-cover"
                    style={{backgroundImage: `url(https://static.zara.net/assets/public/e16f/0e3c/f283424cbec0/1827fabc0227/01887302076-p/01887302076-p.jpg?ts=1758730372795&w=1440)`}}
                ></div>
                <div className="w-1/2 flex flex-col justify-center px-18">
                    <div className="font-light text-xl">
                        <div>
                            STRIPED HARRY LAMBERT T-SHIRT
                        </div>
                        <div>
                            Rs. 3550.00
                        </div>
                    </div>
                    <div className="font-light text-xs uppercase text-gray-500">
                        MRP incl. of all taxes
                    </div>
                    <hr className="my-8" />
                    <Button variant="outline"
                            className="font-light uppercase outline-none shadow-none rounded-none"
                    >
                        add
                    </Button>
                    <div className="font-light text-sm">
                        <div className="mt-4">
                            Relaxed cropped fit T-shirt made from compact cotton fabric. <br/>
                            Featuring a round neck and long sleeves. Finished with contrasting ribbed trim.
                        </div>
                        <div className="mt-4">
                            Special collaboration Harry Lambert for Zara x Disney.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
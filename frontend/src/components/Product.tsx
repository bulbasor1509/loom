import {Link} from "react-router";

const Product = () => {
    return(
        <>
            <Link to={"/mens/1"} className="w-[18rem] h-[28rem]">
                <img
                    src="https://static.zara.net/assets/public/58bc/c1d9/9acc4a779060/89cffaeecc88/01887302076-a1/01887302076-a1.jpg?ts=1758531652268&w=712"
                    className="w-full h-11/12 object-cover"
                    alt="textured check shirt"
                 />
                <div className="h-1/12 text-xs font-light uppercase mt-2">
                    <div>
                        STRIPED HARRY LAMBERT T-SHIRT
                    </div>
                    <div>
                        Rs. 3550.00
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Product;

import Hero from "./components/Hero.tsx"
import ProductList from "./components/ProductList.tsx"
import {useGetProductsByGenderQuery} from "./redux/services/product.service.ts"

const Mens = () => {
    const {data} = useGetProductsByGenderQuery("men")
    return (
        <>
            <div>
                <Hero source={"https://image.hm.com/content/dam/global_campaigns/season_02/men/3002b/scroll/3002B-atelier-aw25-drop2-LP2-CPD-3x2.jpg?imwidth=4800"}/>
            </div>
            {
                data && (
                    <ProductList products={data}/>
                )
            }
        </>
    )
}

export default Mens
import Hero from "./components/Hero.tsx"
import ProductList from "./components/ProductList.tsx"

const Home = () => {
    return (
        <>
            <Hero source={"https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"}/>
            <ProductList products={[]}/>
        </>
    )
}

export default Home
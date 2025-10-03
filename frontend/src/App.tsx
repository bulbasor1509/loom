import {Routes, Route, useLocation} from "react-router";
import Home from "./Home.tsx";
import Navbar from "./components/Navbar";
import Mens from "./Mens.tsx";
import Womans from "./Womans.tsx";
import ProductDetails from "./ProductDetails.tsx";
import Footer from "./components/Footer.tsx";
import Cart from "./Cart.tsx";
import Login from "./Login.tsx";


const App = () => {
    const location = useLocation()
    const hideNavFooter = location.pathname === "/login"
    return(
        <>
            {!hideNavFooter && <Navbar/>}
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/mens" Component={Mens}/>
                <Route path="/womans" Component={Womans} />
                <Route path=":category/:productId" Component={ProductDetails} />
                <Route path="/cart" Component={Cart}/>
                <Route path="/login" Component={Login}/>
            </Routes>
            {!hideNavFooter && <Footer/>}
        </>
    )
}

export default App;
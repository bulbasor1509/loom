import {Routes, Route} from "react-router";
import Home from "./Home.tsx";
import Navbar from "./components/Navbar";
import Mens from "./Mens.tsx";
import Womans from "./Womans.tsx";
import ProductDetails from "./ProductDetails.tsx";

const App = () => {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/mens" Component={Mens}/>
                <Route path="/womans" Component={Womans} />
                <Route path=":category/:productId" Component={ProductDetails} />
            </Routes>
        </>
    )
}

export default App;
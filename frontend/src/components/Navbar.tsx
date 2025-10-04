import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { FiShoppingBag } from "react-icons/fi"
import {useSelector} from "react-redux"
import type {RootState} from "../redux/store.ts"

const Navbar = () => {
    const [navBackground, setNavBackground] = useState("bg-transparent")
    const cartLength = useSelector<RootState, number>(state => state.cart.length)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollRatio = scrollTop / docHeight;
            if(scrollRatio > 0.2) {
                setNavBackground("bg-white")
            } else {
                setNavBackground("bg-transparent")
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
        <>
            <div className={`fixed w-full top-0 left-0 transition-colors duration-300 ${navBackground}`}>
                <div className="w-full h-16 flex items-center justify-between px-12">
                    <div className="text-xl uppercase font-medium">
                        loom
                    </div>
                    <div className="h-full flex items-center justify-center gap-8 uppercase text-xs">
                        <NavLink to="/">home</NavLink>
                        <NavLink to="/mens">men</NavLink>
                        <NavLink to="/womans">woman</NavLink>
                        <NavLink to="/cart" className="relative">
                            <div
                                className="absolute right-[-5px] top-[-3px] bg-black w-4 h-4 rounded-full text-white flex item-center justify-center text-xs font-light"
                            >
                                {cartLength}
                            </div>
                            <FiShoppingBag size={20} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
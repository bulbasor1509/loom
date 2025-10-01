import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
    const [navBackground, setNavBackground] = useState("bg-transparent")

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
                        <a href="/mens">mens</a>
                        <a href="/womans">womans</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
import { Link } from "react-router"

const Footer = () => {
    return(
        <> 
            <div className="px-12 py-8">
                <div className="flex justify-between">
                    <div className="text-xl">
                        LOOM
                    </div>
                    <div className="uppercase text-xs flex gap-4">
                        <Link to="/">home</Link>
                        <Link to="/mens">mens</Link>
                        <Link to="/womans">womans</Link>
                    </div>
                </div>
                <div className="text-xs uppercase mt-2">
                    developed by loom all rights reserved
                </div>
            </div>
        </>
    )
}

export default Footer
import {Outlet} from "react-router"
// import {useSelector} from "react-redux";
// import type {RootState} from "../types/store.type";

const ProtectedRoute = () => {
    // const token = useSelector((state: RootState) => state.auth.token)

    return (
        <>
            {
                // token ? <Outlet/> : <Navigate to="/login" />
                <Outlet/>
            }
        </>
    )
}

export default ProtectedRoute
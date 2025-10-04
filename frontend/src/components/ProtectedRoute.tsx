import {Outlet, Navigate} from "react-router"
import {useSelector} from "react-redux";
import type {RootState} from "../types/store.type";

const ProtectedRoute = () => {
    const persist = useSelector((state: RootState) => state.auth.persist)

    return (
        <>
            {
                persist ? <Outlet/> : <Navigate to="/login" />
            }
        </>
    )
}

export default ProtectedRoute
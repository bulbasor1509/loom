import {useTokenRefreshMutation} from "../redux/services/auth.service.ts"
import {useEffect} from "react";
import {Outlet, Navigate} from "react-router"

const ProtectedRoute = () => {
    const [refreshToken] =useTokenRefreshMutation()
    const persistLogin = JSON.parse(localStorage.getItem("persist") as string) as boolean
    useEffect(() => {
        refreshToken()
    }, [refreshToken])

    return (
        <>
            {
                persistLogin ? <Outlet/> : <Navigate to="/login" />
            }
        </>
    )
}

export default ProtectedRoute
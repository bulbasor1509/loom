import {Outlet, useNavigate} from "react-router"
import {useSelector} from "react-redux";
import type {RootState} from "../types/store.type";
import {useRefreshMutation} from "@/redux/services/auth.service.ts";
import {useEffect, useState} from "react";

const ProtectedRoute = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const [refresh] = useRefreshMutation()
    const [isAllowed, setIsAllowed] = useState(false)
    const {persist} = useSelector((state: RootState) => state.persist)
    const navigate = useNavigate()
    const navigateLogin = () => navigate("/login")

    useEffect(() => {
        // debugger
        const verifyRefreshToken = async () => {
            console.log("verifying refresh token")
            try{
                await refresh()
                setIsAllowed(true)
            } catch (err){
                console.log(err)
            }
        }
        if (token){
            setIsAllowed(true)
        } else if (!token && persist){
            verifyRefreshToken()
        } else {
            navigateLogin()
        }
    }, [token, persist, refresh])

    return (
        <>
            {
                isAllowed ? <Outlet/> : null
            }
        </>
    )
}

export default ProtectedRoute
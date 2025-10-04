import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {useSignInMutation} from "../redux/services/auth.service.ts"
import {useNavigate} from "react-router"
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/types/store.type.ts";
import {setToken} from "@/redux/slices/auth.slice.ts";
import {setPersist} from "@/redux/slices/persist.slice.ts";


export function UserInputComponent({type, name}:{type: string, name: string}){
    return (
        <div className="mt-4">
            <label htmlFor={name} className="block uppercase text-xs mb-1">{name}</label>
            <Input
                type={type}
                className="outline-none rounded-none focus-visible:ring-[0px]"
                name={name}
                id={name}
            />
        </div>
    )
}

const SignIn = () => {
    const [triggerSignIn] = useSignInMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    // const [_, setPersist] = usePersist()

    const handleSignInAction = async (formData: FormData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        console.log(email, password)
        const userData = await triggerSignIn({ email, password }).unwrap()
        if (userData.status === 200) {
            dispatch(setToken(userData.data))
            dispatch(setPersist(true))
            return navigate("/")
        }
    }

    return(
        <>
            <form className="w-3/4" action={handleSignInAction}>
                <UserInputComponent type="email" name="email"/>
                <UserInputComponent type="password" name="password"/>
                <div className="flex flex-col gap-4 mt-4">
                    <Button
                        type="submit" variant={"outline"}
                        className="w-full rounded-none uppercase bg-gray-950 text-white text-sm font-light"
                    >log in</Button>
                </div>
            </form>
            <div className="w-3/4 mt-4">
                <Button
                    variant={"outline"}
                    className="w-full rounded-none uppercase text-sm font-light"
                    onClick={() => navigate("/register")}
                >register</Button>
            </div>
        </>
    )
}

export default SignIn
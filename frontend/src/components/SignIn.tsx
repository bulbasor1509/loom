import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useActionState } from "react"
import {useSignInQuery} from "../redux/services/user.service"

const SignIn = () => {
    const {data} = useSignInQuery()
    const [state, formAction, isPending] = useActionState()
    
    return(
        <>
            <form className="w-3/4" action={formAction}>
                <div className="mt-4">
                    <label className="block uppercase text-xs mb-1">email</label>
                    <Input 
                        type="email"
                        className="outline-none rounded-none focus-visible:ring-[0px]"
                        name="email"
                    />
                </div>
                <div className="mt-4 mb-4">
                    <label className="block uppercase text-xs mb-1">password</label>
                    <Input 
                        type="password" 
                        className="outline-none rounded-none focus-visible:ring-[0px]"
                        name="password"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button variant={"outline"} className="w-full rounded-none uppercase bg-gray-950 text-white text-sm font-light">log in</Button>
                    <Button variant={"outline"} className="w-full rounded-none uppercase text-sm font-light">register</Button>
                </div>
            </form>
        </>
    )
}

export default SignIn
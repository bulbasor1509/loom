import {Button} from "./ui/button.tsx"
import {UserInputComponent} from "./SignIn.tsx"
import {useSignUpMutation} from "../redux/services/auth.service.ts"

const SignUp = () => {
    const [triggerSignUp] = useSignUpMutation()
    const handleSignUpAction = async (formData: FormData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const name = formData.get("name") as string
        await triggerSignUp({email, password, name})
    }
    return(
        <>
            <form className="w-3/4" action={handleSignUpAction}>
                <UserInputComponent type="email" name="email"/>
                <UserInputComponent type="password" name="password"/>
                <UserInputComponent type="text" name="name"/>
                <div className="flex flex-col gap-4 mt-4">
                    <Button
                        type="submit"
                        variant={"outline"}
                        className="w-full rounded-none uppercase bg-gray-950 text-white text-sm font-light"
                    >create account</Button>
                </div>
            </form>
        </>
    )
}

export default SignUp
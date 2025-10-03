import { Button } from "./ui/button"

import { Input } from "./ui/input"



const SignIn = () => {
    
    return(
        <>
            <form>
                <div>
                    <label className="uppercase">email</label>
                    <Input type="email"/>
                </div>
                <div>
                    <label className="upprcase">password</label>
                    <Input type="password"/>
                </div>
            </form>
        </>
    )
}

export default SignIn
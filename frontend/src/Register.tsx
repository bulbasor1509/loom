import SignUp from "./components/SignUp.tsx"

const Register = () => {
    return (
        <>
            <div className="w-full h-screen flex">
                <div className="w-1/2 h-full flex flex-col justify-center px-12">
                    <div className="text-5xl uppercase">
                        loom
                    </div>
                    <div className="text-lg font-light uppercase mt-8">
                        personal details
                    </div>
                    <SignUp/>
                </div>
            </div>
        </>
    )
}

export default Register
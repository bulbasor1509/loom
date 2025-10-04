import SignIn from "./components/SignIn"

const Login = () => {
    return (
        <>
            <div className="w-full h-screen flex">
                <div className="w-1/2 h-full flex flex-col justify-center px-12">
                    <div className="text-5xl uppercase">
                        loom
                    </div>
                    <div className="text-lg font-light uppercase mt-8">
                        log in
                    </div>
                    <SignIn/>
                </div>
                <div
                    className="w-1/2 bg-cover"
                    style={{
                        backgroundImage: `url(https://static.zara.net/assets/public/043a/7e92/30e64fd9b0a4/f9c6ef6640e6/image-web-9e05ec44-49ce-45ae-b2e6-dd1cddc7483f-default/image-web-9e05ec44-49ce-45ae-b2e6-dd1cddc7483f-default.jpg?ts=1758811652122&w=1440)`
                    }}
                ></div>
            </div>
        </>
    )
}

export default Login
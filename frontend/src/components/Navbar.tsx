const Navbar = () => {
    return (
        <>
            <div className="w-full absolute top-0 left-0">
                <div className="w-full h-16 flex items-center justify-between px-8">
                    <div className="text-xl uppercase font-medium">
                        loom
                    </div>
                    <div className="h-full flex items-center justify-center gap-8 uppercase text-xs">
                        <a href="/">home</a>
                        <a href="/mens">mens</a>
                        <a href="/womans">womans</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
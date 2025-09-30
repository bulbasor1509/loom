const Hero = ({source} :{source: string}) => {
    return(
        <>
            <div 
                className="h-[45rem] w-full bg-cover"
                style={{backgroundImage: `url(${source})`}}
            ></div>
        </>
    )
}

export default Hero;
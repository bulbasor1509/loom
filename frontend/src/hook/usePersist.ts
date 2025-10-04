import {useState, useEffect} from "react"

export const usePersist= () => {
    const [persist, setPersist] = useState<boolean>(
        JSON.parse(localStorage.getItem("persist") as string) || false
    )
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])
    return [persist, setPersist]
}
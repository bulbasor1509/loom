import {Button} from "@/components/ui/button.tsx";
import {useLogOutMutation} from "@/redux/services/auth.service.ts";
import {useNavigate} from "react-router";

const Profile = () => {
    const [logout] = useLogOutMutation()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    return (
        <>
           <div className="flex-grow flex items-center mt-12 px-12">
               <div className="w-2/5 flex flex-col justify-left uppercase">
                   profile
               </div>
               <div className="uppercase flex flex-col gap-4">
                   <div>prathamesh</div>
                   <div>
                       <div className="text-sm">address</div>
                       <div className="text-xs font-light mt-2">2436 Main Street, Springfield, IL 62704, United States</div>
                   </div>
                   <div>
                       <div className="text-sm">phone</div>
                       <div className="text-xs font-light mt-2">+91 9326538837</div>
                   </div>
                   <div>
                       <Button
                           variant="outline" className="rounded-none shadow-none uppercase font-light text-xs"
                           onClick={() => {handleLogout()}}
                       >sign out</Button>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Profile
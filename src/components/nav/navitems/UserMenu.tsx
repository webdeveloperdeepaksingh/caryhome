"use client";
import { RiFolderUserLine } from "react-icons/ri";
import { RiFolderSettingsLine } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { MdDashboard } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MenuItem from "./MenuItem";
import Cookies from "js-cookie";
import BackDrop from "./BackDrop";
import { BASE_API_URL } from "../../../../utils/constant";
 
type loggedInUserType = {
    usrName:string,
    usrImage:string,
}

const UserMenu : React.FC = () => {

    const [loggedInUserData, setLoggedInUserData] = useState<loggedInUserType>({usrName:'', usrImage:''});
    const [isToggleOn, setIsToggleOn] = useState(false);
    const router = useRouter();

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    }; 

    useEffect(()=>{
        async function getLoggedInUser(){
            try {
                const res = await fetch(`${BASE_API_URL}/api/account/${loggedInUser.result?._id}`);
                const userData = await res.json();
                setLoggedInUserData(userData.accData) ;
             } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        }
        getLoggedInUser();
    },[]);

    const toggleOn = useCallback(()=>{
        setIsToggleOn((prev)=>!prev);
    },[]);

    const handleLogOut = async () =>{
        try 
         {
             Cookies.remove('token');
             Cookies.remove('loggedInUserId'); 
             Cookies.remove('loggedInUserRole'); 
             toast.success('Logged out successfully!');
             router.push("/login");
         } catch (error) {
             console.error("Error logging out.")
         } 
     }
     

    return ( 
        <div>
            <div className="relative z-30">
                <div onClick={toggleOn} className="p-2 border-[1.5px] border-indigo-800 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                    <Avatar src={loggedInUserData.usrImage} />
                    <AiFillCaretDown/>
                </div>
                {
                    isToggleOn && (
                        <div className="absolute rounded-md shadow-md w-[220px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                        {loggedInUser.result?._id ? 
                            <div className="p-3">
                                <Link href="/dashboard/home">
                                    <MenuItem onClick={toggleOn}>
                                        <div className="flex items-center gap-2">
                                            <MdDashboard size={24}/>
                                            <p>Dashboard</p>
                                        </div> 
                                    </MenuItem>
                                </Link>
                                <Link href={`/dashboard/profile/${loggedInUser.result?._id}`}>
                                    <MenuItem onClick={toggleOn}>
                                        <div className="flex items-center gap-2">
                                            <RiFolderUserLine size={24}/>
                                            <p>Profile Settings</p>
                                        </div> 
                                    </MenuItem>
                                </Link>
                                <Link href={`/dashboard/account/${loggedInUser.result?._id}`}>
                                    <MenuItem onClick={toggleOn}>
                                        <div className="flex items-center gap-2">
                                            <RiFolderSettingsLine size={24} />
                                            <p>Account Settings</p>
                                        </div> 
                                    </MenuItem>
                                </Link>
                                <Link href={`/dashboard/change-password/${loggedInUser.result?._id}`}>
                                    <MenuItem onClick={toggleOn}>
                                        <div className="flex items-center gap-2">
                                            <PiPasswordFill size={24} />
                                            <p>Change Password</p>
                                        </div>
                                    </MenuItem>
                                </Link>
                                <hr/>
                                <MenuItem onClick={toggleOn}>
                                    <div className="flex items-center gap-2">
                                        <RiLogoutBoxRLine size={24} />
                                        <button type="button" onClick={handleLogOut}>Logout</button>
                                    </div>                           
                                </MenuItem>                               
                             </div> 
                             :
                             <div className="p-4">
                                <Link href="/login">
                                    <MenuItem onClick={toggleOn}>
                                        Login
                                    </MenuItem>
                                </Link>
                                <Link href="/register">
                                    <MenuItem onClick={toggleOn}>
                                        Register
                                    </MenuItem>
                                </Link>
                             </div>
                            }
                        </div>
                    )
                }
            </div>
            { isToggleOn ? <BackDrop onClick={toggleOn}/> : null}
        </div>
     );
}
 
export default UserMenu;
"use client";
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
 
interface UserMenuProps {
    loggedInUserId: string | null;
 }

const UserMenu : React.FC<UserMenuProps>= ({loggedInUserId}) => {

    const [isToggleOn, setIsToggleOn] = useState(false);

    const toggleOn = useCallback(()=>{
        setIsToggleOn((prev)=>!prev);
    },[]);

    return ( 
        <div>
            <div className="relative z-30">
                <div onClick={toggleOn} className="p-2 border-[1.5px] border-indigo-800 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                    <Avatar src={loggedInUserId?.image}/>
                    <AiFillCaretDown/>
                </div>
                {
                    isToggleOn && (
                        <div className="absolute rounded-md shadow-md w-[220px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                            {loggedInUserId ? 
                            <div className="p-4">
                                <Link href="/myorders">
                                    <MenuItem onClick={toggleOn}>
                                        My Orders
                                    </MenuItem>
                                </Link>
                                <Link href="/admin">
                                    <MenuItem onClick={toggleOn}>
                                        Admin Dashboard
                                    </MenuItem>
                                </Link>
                                <hr/>
                                <MenuItem onClick={()=>{
                                    toggleOn();
                                    signOut();
                                }}>
                                    Logout
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
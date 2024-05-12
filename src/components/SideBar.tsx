"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaBox } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { LuListOrdered } from "react-icons/lu";
import { RiListSettingsFill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";

const SideBar = () => {

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole")
        }
    };
    
    return ( 
        <div>
            <div className="flex flex-col w-[250px] bg-indigo-800 h-screen p-5">
                <div className="flex flex-col">
                    {
                        loggedInUser.result.usrRole === "Admin" ? 
                        (
                            <div>
                                <Link href="/dashboard/home" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <MdDashboard size={24}/>
                                    <span className="font-semibold">
                                        DASHBOARD
                                    </span>
                                </Link>
                                <Link href="/dashboard/categories" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <BiCategory size={24}/>
                                    <span className="font-semibold">
                                        CATEGORIES
                                    </span>
                                </Link>
                                <Link href="/dashboard/products" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <FaBox size={24}/>
                                    <span className="font-semibold">
                                        PRODUCTS
                                    </span>
                                </Link>
                                <Link href="/dashboard/orders" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <LuListOrdered size={24}/>
                                    <span className="font-semibold">
                                        ORDERS
                                    </span>
                                </Link>
                                <Link href={`/dashboard/settings/66309b42e0784b14338dc76f`} className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <RiListSettingsFill size={24}/>
                                    <span className="font-semibold">
                                        SETTINGS
                                    </span>
                                </Link>
                            </div>
                        ) 
                        : 
                        (
                            <div>
                                <Link href="/dashboard/home" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <MdDashboard size={24}/>
                                    <span className="font-semibold">
                                        DASHBOARD
                                    </span>
                                </Link>
                                <Link href="/dashboard/myorders" className="flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3">
                                    <PiShoppingBagOpenFill size={24}/>
                                    <span className="font-semibold">
                                        MY ORDERS
                                    </span>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;
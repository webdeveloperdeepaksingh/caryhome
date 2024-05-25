"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { FaBox } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { LuListOrdered } from "react-icons/lu";
import { RiListSettingsFill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { useEffect, useState } from "react";
 
const SideBar = () => {

    const [isLoading, setIsloading] = useState(true);
    const currentPath = usePathname();

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole")
        }
    };

    useEffect(()=>{
        if(loggedInUser.result.usrRole){
            setIsloading(false);
        }
    },[])

    const adminMenu = [
        {
            name:'DASHBOARD',
            url:'/dashboard/home',
            icon:<MdDashboard size={24}/>
        },
        {
            name:'CATEGORIES',
            url:'/dashboard/categories',
            icon:<BiCategory size={24}/>
        },
        {
            name:'PRODUCTS',
            url:'/dashboard/products',
            icon:<FaBox size={24}/>
        },
        {
            name:'ORDERS',
            url:'/dashboard/orders',
            icon:<LuListOrdered size={24}/>
        },
        {
            name:'SETTINGS',
            url:'/dashboard/settings/66309b42e0784b14338dc76f',
            icon:<RiListSettingsFill size={24}/>
        },
      ]

      const userMenu = [
        {
            name:'DASHBOARD',
            url:'/dashboard/home',
            icon:<MdDashboard size={24}/>
        },
        {
            name:'MY ORDERS',
            url:`/dashboard/myorders/${loggedInUser.result._id}`,
            icon:<PiShoppingBagOpenFill size={24}/>
        }
      ]

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }
    
    return ( 
        <div>
            <div className="flex flex-col w-[250px] bg-indigo-800 h-screen p-6">
                <div className="flex flex-col">
                    {
                        loggedInUser.result.usrRole === "Admin" ? 
                        (
                            <div>
                                {
                                    adminMenu.map((item:any)=>{
                                        return (
                                            <Link key={item.url} href={item.url}  className={currentPath === `${item.url}` ? "flex items-center p-3 rounded-md border-[1.5px] border-white text-black bg-white gap-3  mb-3" : "flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3"}>
                                                <span>
                                                    {item.icon}
                                                </span>
                                                <span className="font-semibold">
                                                    {item.name}
                                                </span> 
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        ) 
                        : 
                        (
                            <div>
                                {
                                    userMenu.map((item:any)=>{
                                        return (
                                            <Link key={item.url} href={item.url}  className={currentPath === `${item.url}` ? "flex items-center p-3 rounded-md border-[1.5px] border-white text-black bg-white gap-3  mb-3" : "flex items-center p-3 rounded-md border-[1.5px] border-white text-white hover:bg-white hover:text-black gap-3 mb-3"}>
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <span className="font-semibold">
                                                    {item.name}
                                                </span> 
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;
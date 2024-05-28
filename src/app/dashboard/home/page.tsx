"use client";
import MonthlySales from "@/components/admindashboard/MonthlySales";
import MonthlySignUps from "@/components/admindashboard/MonthlySignUps";
import SalesChart from "@/components/admindashboard/SalesChart";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { NextPage } from "next";
 
const Home : NextPage  = () => {

    const [isLoading, setIsloading] = useState(true);
    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    }; 

    useEffect(()=>{
        if(loggedInUser.result.usrRole){
            setIsloading(false);
        }
    },[])

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }

    return ( 
        <div>
            <title>DASHBOARD</title>
            <div className="flex flex-col w-full gap-9 p-9 border-[1.5px] border-indigo-800 rounded-md">
                {
                    loggedInUser.result.usrRole === "Admin" ? 
                    (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
                                <div className="border-[1.5px] border-indigo-800 rounded-md">
                                    <MonthlySales/>
                                </div>
                                <div className="border-[1.5px] border-indigo-800 rounded-md">
                                    <MonthlySignUps/>
                                </div>
                            </div>
                            <div className="border-[1.5px] h-auto shadow-lg border-indigo-800 rounded-md p-6">
                                <SalesChart/>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                        <div className="text-3xl text-center uppercase font-bold">
                            <h1>
                                Welcome 
                            </h1>
                            <p>
                                to 
                            </p>
                            <p>
                                Carryhome | Electronic Shop!
                            </p>
                        </div>                            
                        </>
                    )
                }
            </div>
        </div>
     );
}
 
export default Home;
"use client";
import { BASE_API_URL } from "../../../utils/constant";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa6";


const MonthlySignUps = () => {

    const [totalSignUps, setTotalSignUps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
    async function fetchSignUps(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/monthly-signups`, {cache: "no-store"});
            if(!res.ok){
                throw new Error("Error fetching revenue.");
            }
            const signupData = await res.json();
            setTotalSignUps(signupData.count);
            } catch (error) {
            console.error("Error fetching revenue: ", error);
        } finally{
            setIsLoading(false);
        }
    }
    fetchSignUps();
    },[])
    
      if(isLoading){
        <div>
            <Loading/>
        </div>
      }

    return ( 
        <div>
            <div className="flex flex-col w-full gap-4 shadow-lg rounded-lg p-4 justify-center items-center">
                <div>
                    <FaUser size={34}/>
                </div>
                <div className="flex gap-3 items-center">
                    <p>Monthly Signups:</p>
                    <p>{totalSignUps}</p>
                </div>
            </div>
        </div>
     );
}
 
export default MonthlySignUps;
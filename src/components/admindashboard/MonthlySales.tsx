"use client";
import { BASE_API_URL } from "../../../utils/constant";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { formatPrice } from "../../../utils/formatPrice";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


const MonthlySales = () => {

    const [revenue, setRevenue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
    async function fetchRevenue(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/monthly-sales`, {cache: "no-store"});
            if(!res.ok){
                throw new Error("Error fetching revenue.");
            }
            const revenueData = await res.json();
            setRevenue(revenueData.orderList);
            } catch (error) {
            console.error("Error fetching revenue: ", error);
        } finally{
            setIsLoading(false);
        }
    }
    fetchRevenue();
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
                    <RiMoneyRupeeCircleFill size={34}/>
                </div>
                <div className="flex gap-4 items-center">
                    <p>Monthly Sales:</p>
                    <p>{ formatPrice(revenue.reduce((acc:number, item:any) => acc + Number(item.orderAmount), 0))}</p>
                </div>
            </div>
        </div>
     );
}
 
export default MonthlySales;
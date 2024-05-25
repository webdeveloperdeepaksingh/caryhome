"use client";
import { OrderType } from "@/app/api/order/route";
import Link from "next/link";
import { formatPrice } from "../../../../utils/formatPrice";
import { BASE_API_URL } from "../../../../utils/constant";
import { useState, useEffect } from "react";

interface OrderListProps {
    orderByUserId: OrderType[];
 }

const MyOrders:React.FC<OrderListProps> = ({orderByUserId}) => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [orderBySearchTerm, setOrderBySearchTerm] = useState<string[] | null>([]);

    useEffect(()=>{
    async function fetchOrderList(){      
        try 
            {               
                const res = await fetch(`${BASE_API_URL}/api/search-myorder/${orderByUserId[0].usrId}?query=${searchTerm}` , {cache:'no-store'});
    
                if(!res.ok){
                    throw new Error("Error fetching prodList.");
                }
    
                const orderList = await res.json();
                setOrderBySearchTerm(orderList.orderByUserId);
    
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchOrderList();
        },[searchTerm]);

    const handleSearch = (val:string) => {
        setSearchTerm(val);
    }
    
    return ( 
        <div className="flex flex-col w-full shadow-lg rounded-lg">
            <div className='flex items-center justify-between mb-2'>
                <div className='border border-solid rounded-sm shadow-md'>
                    <input
                        type='search'
                        onKeyUp={(e) => {
                            const inputElement = e.target as HTMLInputElement;
                            handleSearch(inputElement.value);
                        }}
                        className='py-2 px-3 max-w-[400px] focus:outline-indigo-800'
                        placeholder='Search order/payment id...'
                    /> 
                </div>
                <div>
                    <Link href='/dashboard/category' className='py-3 px-3 rounded-sm bg-indigo-800 hover:bg-indigo-600 text-white font-bold'>ADD</Link>
                </div>
            </div>
            <table className="table-auto w-full text-left">
                <thead className='font-bold bg-gray-200'>
                    <tr>
                        <th className='p-4'>ORDER ID</th>
                        <th className='p-4'>PAYMENT ID</th>
                        <th className='p-4'>PRICE</th>
                        <th className='p-4'>PAYMENT</th>
                        <th className='p-4'>DELIVERY</th>
                        <th className='p-4'>ACTION</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>
                {
                    orderBySearchTerm ?
                        orderBySearchTerm.map((item:any)=> {
                            return(
                            <tr className='hover:bg-gray-100' key={item._id}>
                                <td className='py-2 px-4'>{item.razorpay_order_id}</td>
                                <td className='py-2 px-4'>{item.razorpay_payment_id}</td>
                                <td className='py-2 px-4'>{formatPrice(Number(item.orderAmount))}</td>
                                <td className='py-2 px-4'>paid</td>
                                <td className='py-2 px-4'>delivered</td>
                                <td className='py-2 px-4'>
                                    <span className="text-xs p-2 border-[1.5px] text-indigo-800 border-indigo-800 font-bold shadow-lg rounded-md">
                                        INVOICE
                                    </span>
                                </td>
                            </tr>
                            )
                        })
                        :
                        orderByUserId?.map((item:any)=> {
                            return(
                            <tr className='hover:bg-gray-100' key={item._id}>
                                <td className='py-2 px-4'>{item.razorpay_order_id}</td>
                                <td className='py-2 px-4'>{item.razorpay_payment_id}</td>
                                <td className='py-2 px-4'>{formatPrice(Number(item.orderAmount))}</td>
                                <td className='py-2 px-4'>paid</td>
                                <td className='py-2 px-4'>delivered</td>
                                <td className='py-2 px-4'>
                                    <span className="text-xs p-2 border-[1.5px] text-indigo-800 border-indigo-800 font-bold shadow-lg rounded-md">
                                        INVOICE
                                    </span>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
 
export default MyOrders;
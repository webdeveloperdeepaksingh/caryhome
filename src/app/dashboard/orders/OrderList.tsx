"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

interface OrderListProps {
    orderData: OrderType[];
}

type OrderType = {
    _id: string,
    catName: string,
    catImage?: string | null, 
}

const OrderList:React.FC<OrderListProps> = ({orderData}) => {

    const handleSearch = (value: any) => {

    }
    
    return ( 
        <div className="flex flex-col w-full shadow-lg rounded-lg">
            <div className='flex items-center justify-between mb-2'>
                <div className='border border-solid rounded-sm shadow-md'>
                    <input type='search' onKeyUp={(e)=> handleSearch(e.target.value)} className='py-2 px-3 max-w-[400px] focus:outline-indigo-800' placeholder='Search category name...'></input>
                </div>
                <div>
                    <Link href='/dashboard/category' className='py-3 px-3 rounded-sm bg-indigo-800 hover:bg-indigo-600 text-white font-bold'>ADD</Link>
                </div>
            </div>
            <table className="table-auto w-full text-left">
                <thead className='font-bold bg-gray-200'>
                    <tr>
                        <th className='p-4'>ORDER ID</th>
                        <th className='p-4'>CUSTOMER</th>
                        <th className='p-4'>PAYMENT</th>
                        <th className='p-4'>ORDER PRICE</th>
                        <th className='p-4'>ORDER STATUS</th>
                        <th className='p-4'>ACTION</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>
                {
                    orderData?.map((item)=> {
                    return(
                    <tr className='hover:bg-gray-100' key={item._id}>
                        <td className='py-2 px-4'>{item.catName}</td>
                        <td className='flex py-2 text-lg gap-6  px-4'>
                            <Link href={`/dashboard/category/${item._id}`}><FaEdit /></Link>
                            <Link href={`/dashboard/categorylist/${item._id}`}><RiDeleteBin5Fill /></Link>
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
 
export default OrderList;
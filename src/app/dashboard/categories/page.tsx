"use client";
import { BASE_API_URL } from "../../../../utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

type CatType = {
    _id?: string,
    catName: string,
    catImage?: string | null, 
}

export default function Categories(){
     
    const router = useRouter();
    const [data, setData] = useState<CatType[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
    async function fetchCatData(){
        try 
            {
                const res = await fetch(`${BASE_API_URL}/api/category`, {cache: "no-store"});

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                
                const catData = await res.json();
                setData(catData.catList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchCatData();
    },[])

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }
    
    return ( 
        <div className="w-full">
            <title>CATEGORIES</title>
            <div className="flex flex-col w-full  rounded-lg">
                <div className='flex mb-4 justify-end'>               
                    <div>
                        <Link href='/dashboard/create-category' className='py-3 px-2 rounded-sm bg-indigo-800 hover:bg-indigo-600 text-white font-bold'>CREATE</Link>  
                    </div>             
                </div>
                <table className="table-auto w-full text-left shadow-lg">
                    <thead className='font-bold bg-gray-200'>
                        <tr>
                            <th className='p-4'>CATEGORY ICON</th>
                            <th className='p-4'>CATEGORY NAME</th>
                            <th className='p-4'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                    {
                        data?.map((item:any)=> {
                        return(
                        <tr className='hover:bg-gray-100' key={item._id}>
                            <td className='py-2 px-4'>
                                <Image alt="img" src={item.catImage ? item.catImage : ''} width={26} height={20}/>
                            </td>
                            <td className='py-2 px-4'>{item.catName}</td>
                            <td className='flex py-2 text-lg gap-6  px-4'>
                                <Link href={`/dashboard/update-category/${item._id}`}><FaEdit /></Link>
                                <Link href={`/dashboard/delete-category/${item._id}`}><RiDeleteBin5Fill /></Link>
                            </td>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
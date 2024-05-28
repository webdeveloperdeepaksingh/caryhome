"use client";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../../../utils/constant";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { formatPrice } from "../../../../utils/formatPrice";
import { RiDeleteBin5Fill } from "react-icons/ri";
 


type ProductType = {
    _id?:string;
    prodName: string;
    prodSlug?: string;
    prodTags?: any;
    prodCat: string;
    prodDesc?: any;
    prodPrice: number;
    prodBrand: string;
    prodReviews?: string[] | null;
    inStock:boolean;
    prodImage?: string[] | null;
}

export default function Products() {

    const [data, setData] = useState<ProductType[] | null>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [itemBySearchTerm, setItemBySearchTerm] = useState<ProductType[] | null>([]);

    useEffect(()=>{
    async function fetchProductList(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/product`, {cache: "no-store"});

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            
            const productData = await res.json();
            setData(productData.prodList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchProductList();
    },[])

    useEffect(()=>{
    async function fetchItemListBySearchTerm(){      
    try 
        {
            
            const res = await fetch(`${BASE_API_URL}/api/search-item?query=${searchTerm}` , {cache:'no-store'});

            if(!res.ok){
                throw new Error("Error fetching prodList.");
            }

            const productList = await res.json();
            setItemBySearchTerm(productList);

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    fetchItemListBySearchTerm();
    },[searchTerm]);
    
    const handleSearch = (val:string) => {
        setSearchTerm(val);
    }

    return ( 
        <div>
            <title>PRODUCTS</title>
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
                            placeholder='Search product name...'
                        />  
                    </div>
                    <div>
                        <Link href='/dashboard/create-product' className='py-3 px-3 rounded-sm bg-indigo-800 hover:bg-indigo-600 text-white font-bold'>CREATE</Link>
                    </div>
                </div>
                <table className="table-auto w-full text-left">
                    <thead className='font-bold bg-gray-200'>
                        <tr>
                            <th className='p-4'>PRODUCT</th>
                            <th className='p-4'>CATEGORY</th>
                            <th className='p-4'>PRICE</th>
                            <th className='p-4'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                    {
                        itemBySearchTerm ?
                            itemBySearchTerm.map((item:any) => (
                                <tr className='hover:bg-gray-100' key={item._id}>
                                <td className='py-2 px-4'>{item.prodName}</td>
                                <td className='py-2 px-4'>{item.prodCat}</td>
                                <td className='py-2 px-4'>{formatPrice(item.prodPrice)}</td>
                                <td className='flex py-2 text-lg gap-6 px-4'>
                                    <Link href={`/dashboard/update-product/${item._id}`}>
                                    <FaEdit />
                                    </Link>
                                    <Link href={`/dashboard/delete-product/${item._id}`}>
                                    <RiDeleteBin5Fill />
                                    </Link>
                                </td>
                                </tr>
                            ))
                            : data?.map((item:any) => (
                                <tr className='hover:bg-gray-100' key={item._id}>
                                <td className='py-2 px-4'>{item.prodName}</td>
                                <td className='py-2 px-4'>{item.prodCat}</td>
                                <td className='py-2 px-4'>{formatPrice(item.prodPrice)}</td>
                                <td className='flex py-2 text-lg gap-6 px-4'>
                                    <Link href={`/dashboard/update-product/${item._id}`}>
                                    <FaEdit />
                                    </Link>
                                    <Link href={`/dashboard/delete-product/${item._id}`}>
                                    <RiDeleteBin5Fill />
                                    </Link>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}

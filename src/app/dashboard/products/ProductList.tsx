"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BASE_API_URL } from "../../../../utils/constant";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProductListProps {
    prodData: ProductType[] | null;
}

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



const ProductList:React.FC<ProductListProps> = ({prodData}) => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [itemBySearchTerm, setItemBySearchTerm] = useState<string[] | null>([]);

    useEffect(()=>{
        async function fetchItemList(){      
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
        fetchItemList();
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
                        placeholder='Search category name...'
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
                            <td className='py-2 px-4'>{item.prodPrice}</td>
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
                        : prodData?.map((item:any) => (
                            <tr className='hover:bg-gray-100' key={item._id}>
                            <td className='py-2 px-4'>{item.prodName}</td>
                            <td className='py-2 px-4'>{item.prodCat}</td>
                            <td className='py-2 px-4'>{item.prodPrice}</td>
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
    );
}
 
export default ProductList;
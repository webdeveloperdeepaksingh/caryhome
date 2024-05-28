"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BASE_API_URL } from "../../../../utils/constant";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatPrice } from "../../../../utils/formatPrice";

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
        <div>
            
        </div>
    );
}
 
export default ProductList;
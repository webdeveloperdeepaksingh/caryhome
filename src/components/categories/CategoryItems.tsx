"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BASE_API_URL } from "../../../utils/constant";
import Container from "../Container";
import { useState, useEffect } from "react";
import Heading from "../Heading";
import ProductCard from "../ProductCard";

 

interface CategoryItemsProps {
    catItems: CatType[];
}

export type CatType = {
    _id: string;
    catName: string;
    catImage:string | null;
}

const CategoryItems:React.FC<CategoryItemsProps>  =  ({catItems}) => {

    
    const [query, setQuery] = useState<string>("All");
    const [productList, setProductList] = useState([]);
    const itemByQuery =  useSelector((store:any) => store.search);

    const handleCategoryItems = (category:string) => {
        setQuery(category);
    }

    console.log(itemByQuery);

    useEffect(()=>{
    async function fetchCatItemList(){      
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/filter-catitems?query=${query}&prod=${itemByQuery}` , {cache:'no-store'});

            if(!res.ok){
                throw new Error("Error fetching course data.");
            }

            const productList = await res.json();
            setProductList(productList);

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    fetchCatItemList();
    },[query, itemByQuery]);
    

    return ( 
        <div>
            <Container>
                <div className="flex flex-col p-6 md:p-0">
                    <div className="grid grid-cols-3  md:grid-cols-5 lg:grid-cols-10 py-4 gap-6  border-t-[1.5px] mt-4">
                        {
                            catItems?.map((item:any, index)=>{
                                return (
                                    <div key={item.catName} onClick={()=>handleCategoryItems(item.catName)} className={`max-w-[100px] h-auto py-3 shadow-lg rounded-md cursor-pointer ${item.catName === query ? "bg-white border-[1.5px] border-black" : "bg-indigo-800"}`}>
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div>
                                                <Image alt={""} className="rounded-md"  src={item.catImage ? item.catImage : ''} width={26} height={20} />
                                            </div>
                                            <div >
                                                <p className={item.catName === query ? "text-black" : "text-white"}>{item.catName}</p>
                                            </div>
                                        </div> 
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <Heading title="Products"/>
                    </div>
                    <div>
                        {
                            productList ? 
                            (
                                <ProductCard data={productList}/>
                            ) 
                            : 
                            ('')
                        }
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryItems;
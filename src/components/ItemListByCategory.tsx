"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_API_URL } from "../../utils/constant";
import { useSelector } from "react-redux";
import Container from "./Container";
import ProductCard from "./ProductCard";
import Heading from "./Heading";
import Loading from "./Loading";


interface CatType  {
    _id?: string,
    catName: string,
    catImage?: string | null, 
}

const ItemListByCategory : React.FC = () => {

    const [cat, setCat] = useState<CatType[] | null>([]);
    const [query, setQuery] = useState<string>("All");
    const [productList, setProductList] = useState([]);
    const itemByQuery =  useSelector((store:any) => store.search);
    const [isLoading, setIsloading] = useState<boolean>(true);

    useEffect(()=> {
    async function fetchCategoryList(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-store' });

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }   
            
            const catData = await res.json();
            setCat(catData.catList);

        } catch (error) {
            console.error("Error fetching catData: ", error);
        } finally{
            setIsloading(false);
        }
    }
    fetchCategoryList();
    },[])

    const handleCategoryItems = (category:string) => {
        setQuery(category);
    }
 
    useEffect(()=>{
    async function fetchProdListByQuery(){      
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
    fetchProdListByQuery();
    },[query, itemByQuery]);

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }
    
    return ( 
        <div>
            <Container>
                <div className="flex flex-col p-6 md:p-0">
                    <div className="grid grid-cols-3  md:grid-cols-5 lg:grid-cols-10 py-4 gap-6  border-t-[1.5px] mt-4">
                        {
                            cat?.map((item:any, index)=>{
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
export default ItemListByCategory;
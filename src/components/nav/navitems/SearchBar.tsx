"use client";
import { BASE_API_URL } from "../../../../utils/constant";
import { productByQuery } from "../../../../redux/slices/searchSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

interface ISearcBar {
    prodName: string;
}

const SearchBar : React.FC = () => {

    const [searchTerm, setSearchTerm] = useState<ISearcBar>({prodName:""});
    const dispatch = useDispatch();
    
    const handleChange = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchTerm((prev:any) =>{
        return {
            ...prev, [name]: value
        }
      }); 
      console.log(searchTerm.prodName);
    }

    
    const handleSearch = (itemByQuery:string) => {
         dispatch(productByQuery({itemByQuery:itemByQuery}));
    }

    return ( 
        <div className="hidden md:flex items-center ">
            <input 
                type="search"
                value={searchTerm.prodName}
                name="prodName"
                onChange={handleChange}
                placeholder="Search items..."
                className="p-2 border border-gray-300 rounded-1-md focus:outline-none focus:border-[0.5px] focus:border-indigo-500 w-80"
            />
            <button type="button" onClick={()=>handleSearch(searchTerm.prodName)}  className="p-[9px] text-white font-semibold bg-indigo-800 hover:bg-indigo-700 rounded-r-md">
                Search
            </button>
        </div>
     );  
}
 
export default SearchBar;
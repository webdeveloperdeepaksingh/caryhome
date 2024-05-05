"use client";

const SearchBar = () => {

    return ( 
        <div className="hidden md:flex items-center ">
            <input 
                type="text"
                placeholder="Search items..."
                className="p-2 border border-gray-300 rounded-1-md focus:outline-none focus:border-[0.5px] focus:border-indigo-500 w-80"
            />
            <button type="button"  className="p-[9px] text-white font-semibold bg-indigo-800 hover:bg-indigo-700 rounded-r-md">
                Search
            </button>
        </div>
     );
     
}
 
export default SearchBar;
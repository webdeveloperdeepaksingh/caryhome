import CategoryList from "./CategoryList";
import { BASE_API_URL } from "../../../../utils/constant";


async function getCatList(){

try 
    {
        const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-cache' });
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }   
        const catList = await res.json();
        return catList;

    } catch (error) {
        console.error("Error fetching catData: ", error);
    }
};

const Categories = async () => {
     
    if(!BASE_API_URL){
        return null;
    }
    
    const catData = await getCatList();
    
    return ( 
        <div className="w-full">
            <CategoryList catData={catData.catList}/>
        </div>
     );
}
 
export default Categories;
import CategoryItems from "./CategoryItems";
import { BASE_API_URL } from "../../../utils/constant";

async function getCatList(){

try 
    {
        const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-store' });

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

    const catItems = await getCatList();

    return ( 
        <div>
            <CategoryItems catItems={catItems.catList}/>
        </div>
     );
}
 
export default Categories;
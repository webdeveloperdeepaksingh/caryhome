import CategoryList from "./CategoryList";
import { BASE_API_URL } from "../../../../utils/constant";
 
export const getCatData = async () => {

    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }   
        return res.json();

    } catch (error) {
        console.error("Error fetching catData: ", error);
    }
};
  
const Categories = async () => {
     
    const catData = await getCatData();
    return ( 
        <div className="w-full">
            <CategoryList catData={catData.catList}/>
        </div>
     );
}
 
export default Categories;
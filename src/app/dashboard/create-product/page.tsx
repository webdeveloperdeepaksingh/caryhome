import { BASE_API_URL } from "../../../../utils/constant";
import CreateProduct from "./CreateProduct";

async function getCatList(){

try 
    {
        const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }   
        const catList = await res.json();
        return catList;

    } catch (error) {
        console.error("Error fetching catData: ", error);
    }
};

const MainCreateProduct = async () => {

    if(!BASE_API_URL){
        return null;
    }
    
    const categoryList = await getCatList();

    return ( 
        <div>
            <CreateProduct categoryList={categoryList.catList}/>
        </div>
     );
}
 
export default MainCreateProduct;
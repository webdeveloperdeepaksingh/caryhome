import { getCatList } from "./getCatList"; 
import CategoryList from "./CategoryList";
import { BASE_API_URL } from "../../../../utils/constant";
  
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
import { getCatList } from "./getCatList"; 
import CategoryList from "./CategoryList";
  
const Categories = async () => {
     
    const catData = await getCatList();
    
    return ( 
        <div className="w-full">
            <CategoryList catData={catData.catList}/>
        </div>
     );
}
 
export default Categories;
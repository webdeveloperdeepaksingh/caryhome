import CategoryList from "./CategoryList";
 import { getCatList } from "./getCatList"; 
  
const Categories = async () => {
     
    const catData = await getCatList();
    
    return ( 
        <div className="w-full">
            <CategoryList catData={catData.catList}/>
        </div>
     );
}
 
export default Categories;
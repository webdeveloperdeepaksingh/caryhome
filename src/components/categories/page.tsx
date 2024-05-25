import CategoryItems from "./CategoryItems";
import { getCatList } from "@/app/dashboard/categories/getCatList";

const Categories = async () => {

    const catItems = await getCatList();

    return ( 
        <div>
            <CategoryItems catItems={catItems.catList}/>
        </div>
     );
}
 
export default Categories;
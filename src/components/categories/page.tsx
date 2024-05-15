import CategoryItems from "./CategoryItems";
import { getCatData } from "@/app/dashboard/categories/page";

const Categories = async () => {

    const catItems = await getCatData();

    return ( 
        <div>
            <CategoryItems catItems={catItems.catList}/>
        </div>
     );
}
 
export default Categories;
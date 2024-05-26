import { BASE_API_URL } from "../../../../utils/constant";
import { getCatList } from "../categories/getCatList";
import CreateProduct from "./CreateProduct";


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
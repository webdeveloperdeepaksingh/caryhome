import { getCatData } from "../categories/page";
import CreateProduct from "./CreateProduct";


const MainCreateProduct = async () => {

    const categoryList = await getCatData();

    return ( 
        <div>
            <CreateProduct categoryList={categoryList.catList}/>
        </div>
     );
}
 
export default MainCreateProduct;
import { getCatList } from "../categories/getCatList";
import CreateProduct from "./CreateProduct";


const MainCreateProduct = async () => {

    const categoryList = await getCatList();

    return ( 
        <div>
            <CreateProduct categoryList={categoryList.catList}/>
        </div>
     );
}
 
export default MainCreateProduct;
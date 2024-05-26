import { getCatList } from "../../categories/getCatList";
import { getProductById } from "./getProductById";
import UpdateProduct from "../UpdateProduct";
import { BASE_API_URL } from "../../../../../utils/constant";

export interface IProdParams {
    ProdId?:string;
}

const MainUpdateProduct = async ({params}:{params:IProdParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    const categoryList = await getCatList();
    const prodById = await getProductById(params);

    return ( 
        <div>
            <UpdateProduct categoryList={categoryList.catList}  prodById={prodById.productById}/>
        </div>
     );
}
 
export default MainUpdateProduct;
import { BASE_API_URL } from "../../../../utils/constant";
import ProductList from "./ProductList";
import { getProducts } from "./getProducts";

const Products = async () => {

    if(!BASE_API_URL){
        return null;
    }

    const prodData = await getProducts();

    return ( 
        <div>
            <ProductList prodData={prodData?.prodList}/>
        </div>
     );
}
 
export default Products;
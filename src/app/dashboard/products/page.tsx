import ProductList from "./ProductList";
import { getProducts } from "./getProducts";

const Products = async () => {

    const prodData = await getProducts();

    return ( 
        <div>
            <ProductList prodData={prodData?.prodList}/>
        </div>
     );
}
 
export default Products;
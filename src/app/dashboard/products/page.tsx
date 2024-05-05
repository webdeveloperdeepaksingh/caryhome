import ProductList from "./ProductList";
import { BASE_API_URL } from "../../../../utils/constant";

export const getProducts = async () => {
    
    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/product`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch prodData');
        }
        return res.json();

    } catch (error) {
        console.error("Error fetching prodData: ", error);
    }
};

const Products = async () => {

    const prodData = await getProducts();

    return ( 
        <div>
            <ProductList prodData={prodData?.prodList}/>
        </div>
     );
}
 
export default Products;
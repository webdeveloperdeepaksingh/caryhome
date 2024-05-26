import { BASE_API_URL } from "../../../../utils/constant";
import ProductList from "./ProductList";



async function getProducts(){
    
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
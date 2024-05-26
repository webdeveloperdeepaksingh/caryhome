import AddRating from "../AddRating";
import ListRating from "../ListRating";
import ProductDetails from "../ProductDetails";
import { IProdParams } from "@/app/dashboard/update-product/[ProdId]/page";
import { BASE_API_URL } from "../../../../utils/constant";


async function getProductById(id:IProdParams){
    
    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/product/${id.ProdId}`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch prodData');
        }
        const prodById = await res.json();
        return prodById;

    } catch (error) {
        console.error("Error fetching prodData: ", error);
    }
};

const MainProductLandingPage = async ({params}: {params:IProdParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    const prodById = await getProductById(params);

    return ( 
        <div>
            <ProductDetails prodById={prodById.productById}/>
            <div className="flex flex-col gap-4 mt-20">
                <AddRating prodById={prodById.productById} />
                <ListRating prodById={prodById.productById}/>
            </div>
        </div>
     );
}
 
export default MainProductLandingPage;
import AddRating from "../AddRating";
import ListRating from "../ListRating";
import ProductDetails from "../ProductDetails";
import { IProdParams } from "@/app/dashboard/update-product/[ProdId]/page";
import { getProductById } from "@/app/dashboard/update-product/[ProdId]/getProductById";
import { BASE_API_URL } from "../../../../utils/constant";

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
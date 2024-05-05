import ProductDetails from "../ProductDetails";
import { IProdParams } from "@/app/dashboard/update-product/[ProdId]/page";
import { getProductById } from "@/app/dashboard/update-product/[ProdId]/page";


const MainProductLandingPage = async ({params}: {params:IProdParams}) => {

    const prodById = await getProductById(params);

    return ( 
        <div>
            <ProductDetails prodById={prodById.productById}/>
        </div>
     );
}
 
export default MainProductLandingPage;
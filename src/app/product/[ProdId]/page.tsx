import AddRating from "../AddRating";
import ListRating from "../ListRating";
import ProductDetails from "../ProductDetails";
import { BASE_API_URL } from "../../../../utils/constant";
import Footer from "@/components/footer/Footer";
 
interface IProdParams {
    ProdId?: string;
}

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

const ProductLandingPage = async ({params}: {params:IProdParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    
    const prodById = await getProductById(params);

    return ( 
        <div>
            <div className="flex flex-col">
                <div>
                    <ProductDetails prodById={prodById.productById}/>
                </div>           
                <div className="flex flex-col gap-4 mt-20">
                    <AddRating prodById={prodById.productById} />
                    <ListRating prodById={prodById.productById}/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
     );
}
 
export default ProductLandingPage;
import UpdateProduct from "../UpdateProduct";
import { BASE_API_URL } from "../../../../../utils/constant";

export interface IProdParams {
    ProdId?:string;
}

async function getCatList(){

    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/category`,{ cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }   
            const catList = res.json();
            return catList;
    
        } catch (error) {
            console.error("Error fetching catData: ", error);
        }
    };

async function getProductById(id:IProdParams) {
    
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
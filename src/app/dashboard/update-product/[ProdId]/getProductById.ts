import { BASE_API_URL } from "../../../../../utils/constant";

export interface IProdParams {
    ProdId?:string;
}

export const getProductById = async (id:IProdParams) => {
    
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
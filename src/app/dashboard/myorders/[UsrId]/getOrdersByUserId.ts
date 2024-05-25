import { BASE_API_URL } from "../../../../../utils/constant";

interface IUserParams {
    UsrId?:string;
}

export const getOrdersByUserId = async (id:IUserParams) => {
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/myorder/${id.UsrId}`,{ cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }   
            const orderListByUserId = res.json();
            return orderListByUserId;
    
        } catch (error) {
            console.error("Error fetching orderData: ", error);
        }
    };
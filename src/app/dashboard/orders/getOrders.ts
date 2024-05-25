import { BASE_API_URL } from "../../../../utils/constant";


export const getOrders = async () => {

try 
    {
        const res = await fetch(`${BASE_API_URL}/api/order`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }   
        const orderList = res.json();
        return orderList;
    
    } catch (error) {
        console.error("Error fetching orderData: ", error);
    }
};
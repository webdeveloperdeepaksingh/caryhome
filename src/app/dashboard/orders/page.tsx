import { BASE_API_URL } from "../../../../utils/constant";
import OrderList from "./OrderList";
 
async function getOrders(){

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

const Orders = async () => {

    if(!BASE_API_URL){
        return null;
    }
    
    const orderList = await getOrders();

    return ( 
        <div>
            <OrderList orderData={orderList.orderList}/>
        </div>
     );
}
 
export default Orders;
import { BASE_API_URL } from "../../../../utils/constant";
import OrderList from "./OrderList";
import { getOrders } from "./getOrders";


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
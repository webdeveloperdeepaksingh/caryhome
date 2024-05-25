import OrderList from "./OrderList";
import { getOrders } from "./getOrders";


const Orders = async () => {

    const orderList = await getOrders();

    return ( 
        <div>
            <OrderList orderData={orderList.orderList}/>
        </div>
     );
}
 
export default Orders;
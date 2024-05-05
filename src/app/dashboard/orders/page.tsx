import OrderList from "./OrderList";
import getOrders from "../../../../actions/getOrders";

const Orders = async () => {

    const orderData = await getOrders();

    return ( 
        <div>
            <OrderList orderData={orderData}/>
        </div>
     );
}
 
export default Orders;
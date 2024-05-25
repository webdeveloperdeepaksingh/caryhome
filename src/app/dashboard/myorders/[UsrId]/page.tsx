import MyOrders from "../MyOrders";
import { getOrdersByUserId } from "./getOrdersByUserId";

interface IUserParams {
    UsrId?:string;
}

const MainMyOrders = async ({ params }: { params: IUserParams }) => {

    const orderList = await getOrdersByUserId(params);

    return ( 
        <div>
            <MyOrders orderByUserId={orderList.orderByUserId}/>
        </div>
     );
}
 
export default MainMyOrders;
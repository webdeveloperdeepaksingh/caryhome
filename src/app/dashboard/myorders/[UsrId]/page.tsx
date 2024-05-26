import { BASE_API_URL } from "../../../../../utils/constant";
import MyOrders from "../MyOrders";
import { getOrdersByUserId } from "./getOrdersByUserId";

interface IUserParams {
    UsrId?:string;
}

const MainMyOrders = async ({ params }: { params: IUserParams }) => {

    if(!BASE_API_URL){
        return null;
    }
    const orderList = await getOrdersByUserId(params);

    return ( 
        <div>
            <MyOrders orderByUserId={orderList.orderByUserId}/>
        </div>
     );
}
 
export default MainMyOrders;
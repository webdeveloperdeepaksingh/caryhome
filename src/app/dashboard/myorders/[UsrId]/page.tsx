import { BASE_API_URL } from "../../../../../utils/constant";
import MyOrders from "../MyOrders";

interface IUserParams {
    UsrId?:string;
}

async function getOrdersByUserId (id:IUserParams){

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
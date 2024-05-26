import { BASE_API_URL } from "../../../../../utils/constant";
import AdminAccount from "../Account";
import { getAccount } from "./getAccount";
 interface IAccountParams {
    UsrId?: string;
}

const MainAdminAccount = async ({params}:{params:IAccountParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    const accData = await getAccount(params);
    
    return ( 
        <div>
            <AdminAccount accData={accData.accData}/>
        </div>
     );
}
 
export default MainAdminAccount;


  
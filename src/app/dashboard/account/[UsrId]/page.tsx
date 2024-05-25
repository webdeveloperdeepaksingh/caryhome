import AdminAccount from "../Account";
import { getAccount } from "./getAccount";
 interface IAccountParams {
    UsrId?: string;
}

const MainAdminAccount = async ({params}:{params:IAccountParams}) => {

    const accData = await getAccount(params);

    return ( 
        <div>
            <AdminAccount accData={accData.accData}/>
        </div>
     );
}
 
export default MainAdminAccount;


  
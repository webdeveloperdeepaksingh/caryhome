import ChangePassword from "../ChangePassword";
import { getAccount } from "../../account/[UsrId]/getAccount";
import { BASE_API_URL } from "../../../../../utils/constant";
interface IAccountParams {
    UsrId?: string;
}

const MainChangePassword = async ({params}:{params:IAccountParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    
    const accData = await getAccount(params);

    return ( 
        <div>
            <ChangePassword accData={accData.accData}/>
        </div>
     );
}
 
export default MainChangePassword;
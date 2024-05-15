import ChangePassword from "../ChangePassword";
import { getAccount } from "../../account/[UsrId]/page";

interface IAccountParams {
    UsrId?: string;
}

const MainChangePassword = async ({params}:{params:IAccountParams}) => {

    const accData = await getAccount(params);

    return ( 
        <div>
            <ChangePassword accData={accData.accData}/>
        </div>
     );
}
 
export default MainChangePassword;
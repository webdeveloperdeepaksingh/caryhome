import ChangePassword from "../ChangePassword";
import { BASE_API_URL } from "../../../../../utils/constant";
interface IAccountParams {
    UsrId?: string;
}

async function getAccount(id: IAccountParams) {

try 
    {
        const res = await fetch(`${BASE_API_URL}/api/account/${id.UsrId}`, {cache: "no-store"});

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const adminAcc = await res.json();
        return adminAcc;
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

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
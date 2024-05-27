import { BASE_API_URL } from "../../../../../utils/constant";
import AdminAccount from "../Account";

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


  
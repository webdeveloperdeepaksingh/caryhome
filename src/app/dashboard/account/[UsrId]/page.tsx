import AdminAccount from "../Account";
import { BASE_API_URL } from "../../../../../utils/constant";
interface IAccountParams {
    UsrId?: string;
}

export const getAccount = async (id: IAccountParams) => {

    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/account/${id.UsrId}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const adminAcc = await res.json();
        return adminAcc;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const MainAdminAccount = async ({params}:{params:IAccountParams}) => {

    const accData = await getAccount(params);

    return ( 
        <div>
            <AdminAccount accData={accData.accData}/>
        </div>
     );
}
 
export default MainAdminAccount;
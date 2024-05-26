import { BASE_API_URL } from "../../../../../utils/constant";
import SettingPage from "../SettingPage";

interface ISettingParams {
    SettId?: string;
}

async function getSettData (id:ISettingParams){

    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/setting/${id.SettId}`,{ cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch settData.');
            }   
            const settingData = res.json();
            return settingData;
     
        } catch (error) {
            console.error("Error fetching settData: ", error);
        }
    };

const Settings = async ({params}:{params : ISettingParams}) => {

    if(!BASE_API_URL){
        return null;
    }
    
    const settData = await getSettData(params);

    return ( 
        <div>
           <SettingPage settData={settData?.settingData}/>
        </div>
     );
}
 
export default Settings;
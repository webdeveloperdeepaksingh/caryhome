import { BASE_API_URL } from "../../../../../utils/constant";
import SettingPage from "../SettingPage";
import { getSettData } from "./getSettData";
interface ISettingParams {
    SettId?: string;
}

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
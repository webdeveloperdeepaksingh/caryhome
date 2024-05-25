import SettingPage from "../SettingPage";
import { getSettData } from "./getSettData";
interface ISettingParams {
    SettId?: string;
}

const Settings = async ({params}:{params : ISettingParams}) => {

    const settData = await getSettData(params);

    return ( 
        <div>
           <SettingPage settData={settData?.settingData}/>
        </div>
     );
}
 
export default Settings;
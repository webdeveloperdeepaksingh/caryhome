import { BASE_API_URL } from "../../../../../utils/constant";

interface ISettingParams {
    SettId?: string;
}

export const getSettData = async (id:ISettingParams) => {

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
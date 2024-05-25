import { BASE_API_URL } from "../../../../../utils/constant";

interface IUserProfileParams {
    UsrId?: string;
}

export const getUserProfile = async (id: IUserProfileParams) => {

    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/profile/${id.UsrId}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const userProfile = await res.json();
        return userProfile;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
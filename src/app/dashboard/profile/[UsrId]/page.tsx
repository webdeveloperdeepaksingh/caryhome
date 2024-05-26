import { BASE_API_URL } from "../../../../../utils/constant";
import UserProfile from "../UserProfile";


interface IUserProfileParams {
    UsrId?: string;
}

async function getUserProfile(id: IUserProfileParams){

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

const MainUserProfile = async ({params}:{params:IUserProfileParams}) => {

    if(!BASE_API_URL){
        return null;
    }

    const proData = await getUserProfile(params);

    return ( 
        <div>
            <UserProfile proData={proData.profileData}/>
        </div>
     );
}
 
export default MainUserProfile;
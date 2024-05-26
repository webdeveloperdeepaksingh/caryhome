import { BASE_API_URL } from "../../../../../utils/constant";
import UserProfile from "../UserProfile";
import { getUserProfile } from "./getUserProfile";

interface IUserProfileParams {
    UsrId?: string;
}

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
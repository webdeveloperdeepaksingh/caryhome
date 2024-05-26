import { BASE_API_URL } from "../../../../../utils/constant";
import UpdateCategory from "../UpdateCategory";


interface ICatParams {
    CatId?: string;
}

async function getCatDataById(id: ICatParams){

    try 
    {
        const res = await fetch(`${BASE_API_URL}/api/category/${id.CatId}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const catById = await res.json();
        return catById;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const MainUpdateCategory = async ({ params }: { params: ICatParams }) => {

    if(!BASE_API_URL){
        return null;
    }

    const catData = await getCatDataById(params);

    return (
        <div className="w-full">
            <UpdateCategory catData={catData.catById} />
        </div>
    );
};

export default MainUpdateCategory;

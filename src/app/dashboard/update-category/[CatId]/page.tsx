import UpdateCategory from "../UpdateCategory";
import { getCatDataById } from "./getCatDataById";

interface ICatParams {
    CatId?: string;
}

const MainUpdateCategory = async ({ params }: { params: ICatParams }) => {

    const catData = await getCatDataById(params);
    return (
        <div className="w-full">
            <UpdateCategory catData={catData.catById} />
        </div>
    );
};

export default MainUpdateCategory;

"use client";
import { NextPage } from "next";
import { BASE_API_URL } from "../../../../../utils/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DelCatParams{
    params : {
        CatId:string;
    };
}

const DeleteCategory : NextPage <DelCatParams> = ({params}): JSX.Element  => {
    
    const router = useRouter();
    const handleDelCat  = async ():Promise<void> => {
    try 
    {
      const res = await fetch(`${BASE_API_URL}/api/category/${params.CatId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete category');
      }else{
        toast.success("Category deleted successfully.");
        router.push('/dashboard/categories');
      } 
    } catch (error) {
        toast.error("Category deletion failed.");
    }
}

    return ( 
        <div>
            <div className="flex max-w-[300px] mx-auto rounded-md shadow-lg p-6 border-[1.5px] border-indigo-800">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl p-3 text-center text-red-600">Alert !</h1>
                        <p className="text-center">
                            You won't be able to restore. Are you sure to delete?
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <button type="button" onClick={handleDelCat} className="btnLeft w-full">CONFIRM</button>
                        <button type="button" onClick={()=> router.push('/dashboard/categories')} className="btnRight w-full">CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DeleteCategory;
"use client";
import { BASE_API_URL } from "../../../../utils/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent } from "react";

interface UpdateCategoryProps {
    catData: CatType;
}

type CatType = {
    _id?: string;
    catName: string;
    catImage: string | null;
} 

const UpdateCategory: React.FC<UpdateCategoryProps> = ({catData}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState({catName: catData.catName, catImage: null,});

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear the previous error
    let errMsg: string[] = [];
    
    if (!data.catName.trim()) {
        errMsg.push('Category name is required.');
    }
    
    if (errMsg.length > 0) {
        setErrorMessage(errMsg.join(' || '));
        setIsLoading(false); // Set isLoading to false here
        return;
    }
    
    try {
        const response = await fetch(`${BASE_API_URL}/api/category/${catData._id}`, {
        method: 'PUT',
        body: JSON.stringify({ catName: data.catName, catImage: data.catImage }),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            if (Array.isArray(post.message)) {
                setErrorMessage(post.message.join(' || '));
            } else {
                setErrorMessage(post.message);
            }
        } else {
            toast.success('Category updated successfully!');
            router.push('/dashboard/category');
         }
    } catch (error) {
        toast.error('Error updating category.');
    } finally {
        setIsLoading(false);
      }
    };      

    return ( 
        <div>
            <form className="flex flex-col max-w-[450px] shadow-lg rounded-md h-auto p-9 mx-auto border-[1.5px] border-indigo-800" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3 gap-2">
                    <label className="font-semibold">Category Name:</label>
                    <input type="text" className="inputBox" name="catName" value={data.catName} onChange={handleChange} placeholder="Category name"></input>
                </div>
                <div className="flex flex-col mb-3 gap-2">
                    <label className="font-semibold">Image:</label>
                    <input type="file" className="inputBox" name="catImage"  placeholder="Choose image."></input>
                </div>
                {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                <div className="mt-3">
                    <button type="submit" className="btnLeft">
                        UPDATE
                    </button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateCategory;
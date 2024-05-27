"use client";
import { BASE_API_URL } from "../../../../utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

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
    const [image, setImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState({catName: catData.catName, catImage: catData.catImage});

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };

    useEffect(()=>{
        router.refresh();
    },[])

    const handleImageChange = (imgFile:any) => {
        if(imgFile){
            setImage(imgFile[0]);
        }
    }

    const handleImageUpload = async (e:any) => {
    e.preventDefault();
    
    const formData = new FormData();
     if (!image) {
        alert('No image selected.');
    }else if (!image.type.startsWith('image/')) {
        alert('Only image files (JPEG, JPG, PNG ) are allowed.');
    }else if(image.size > 50000){   //in bytes
        alert('Image size exceeds 50KB max limit.');
    }else{
        formData.append('file', image);
        formData.append('upload_preset', 'carryhome_images');
        formData.append('cloud_name', 'dlnjktcii');
        
        fetch('https://api.cloudinary.com/v1_1/dlnjktcii/image/upload', {
            method: 'PUT',
            body: formData
        })
        .then((res) => res.json())
        .then((formData) => {
            data.catImage = formData.secure_url;
            if(formData.secure_url){
                toast.success('Image uploaded successfully!');
            }
            else{
                toast('Image upload failed...!');
            }
        })
        .catch((err) => {
            console.error('Error uploading image:', err);
        });
        }   
    };

    const handleRemoveImage = async (imageUrl:any) => {   
        if(imageUrl){
                const parts = imageUrl.split('/'); // Split the URL by slashes ('/')
                const filename = parts.pop();  //and get the last part
            try 
            {
                const public_id = filename.split('.')[0]; // Split the filename by periods ('.') and get the first part
                const response = await fetch(`${BASE_API_URL}/api/removeimagefiles`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ public_id }), // Send the file name to delete
                });
    
                const result = await response.json();
                
                if(result.success === false){
                    toast.error(`${result.msg}`);
                }else{
                    toast.success(`${result.msg}`);
                    data.catImage=null;
                }      
            } catch (error) {
                console.error('Error deleting image:', error);
            }
            }
        };
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Clear the previous error
    let errMsg: string[] = [];
    
    if (!data.catName.trim()) {
        errMsg.push('Category name is required.');
    }
    
    if (errMsg.length > 0) {
        setErrorMessage(errMsg.join(' || '));
        return;
    }
    
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/category/${catData._id}`, {
            method: 'PUT',
            body: JSON.stringify({ catName: data.catName, catImage: data.catImage }),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error('Category updation failed!');
        } else {
            toast.success('Category updated successfully!');
         }
    } catch (error) {
        toast.error('Error updating category.');
    } 
    };      

    return ( 
        <div>
            <form className="flex flex-col max-w-[500px] shadow-lg rounded-md h-auto p-9 mx-auto border-[1.5px] border-indigo-800" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3 gap-2">
                    <label className="font-semibold">Category Name:</label>
                    <input type="text" className="inputBox" name="catName" value={data.catName} onChange={handleChange} placeholder="Category name"></input>
                </div>
                <div className="flex flex-col mb-3 gap-2">
                    <label className="font-semibold">Image:</label>
                    <div className="flex items-center gap-1">
                        <input type="file" className="inputBox" name="catImage" accept='image/*'  onChange={(e)=>handleImageChange(e.target.files)}></input>
                        <button type="button" className="btnRight" onClick={handleImageUpload}>Upload</button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Image alt="img" src={data.catImage ? data.catImage : ""} width={26} height={20}/>
                    {data.catImage ? (<button type="button" className="btnRemove" onClick={()=>handleRemoveImage(data.catImage)}>Remove</button>) : (null)}
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
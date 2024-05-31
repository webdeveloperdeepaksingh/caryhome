"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "../../../../../utils/constant";
import { FormEvent, useEffect, useState } from "react";
import Loading from "./Loading";
import { NextPage } from "next";
 
interface IUserProfileParams {
    params: {
        UsrId?: string;
    };
}
interface ProfileType  {
    usrAddress:string;
    usrImage:string;
}

const UserProfile : NextPage <IUserProfileParams> = ({params}) => {

    const router = useRouter();
    const [imgUrl, setImgUrl] = useState<string> ('');
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<ProfileType>({usrImage:'', usrAddress:''});

    useEffect(()=>{
    async function fetchProfileData(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/profile/${params.UsrId}`, {cache: "no-store"});

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            
            const proData = await res.json();
            setData(proData.profileData);
            setImgUrl(proData.profileData.usrImage);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchProfileData();
    },[])

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };

    const handleChangeImage = (imgFile:any) => {
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
            if(formData.secure_url){
                setImgUrl(formData.secure_url);
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
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/profile/${params.UsrId}`, {
            method: 'PUT',
            body: JSON.stringify(
                { 
                    usrImage: imgUrl, 
                    usrAddress: data.usrAddress, 
                }
            ),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error("Profile saving failed!");
        } else {
            toast.success('Profile saved successfully!');
            router.refresh();
        }
    } catch (error) {
        toast.error('Error saving data.');
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
                setImgUrl('');
                data.usrImage = '';
                toast.success(`${result.msg}`);
            }      
        } catch (error) {
            console.error('Error deleting image:', error);
        }
        }
    };

    if(isLoading){
        return<div>
            <Loading/>
        </div>
    }
    
    return ( 
        <div>
            <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-bold">PROFILE SETTING</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-9">
                        <div className="relative w-auto border-[1.5px] border-gray-300 rounded-md">
                            <Image alt="profile" src={imgUrl ? imgUrl : data.usrImage} width={568} height={350}/>
                            <button 
                                type="button" 
                                className="btnRemove absolute bottom-[-8px] right-2"
                                onClick={()=>handleRemoveImage(imgUrl)}
                            >
                                REMOVE
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">Address:</label>
                                <textarea  name="usrAddress" value={data.usrAddress} onChange={handleChange} className="inputBox" ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">Image:[Size: 568*350]</label>
                                <div className="flex gap-1">
                                    <input type="file" name="usrImage" accept='image/*'  onChange={(e)=>handleChangeImage(e.target.files)} className="inputBox w-full" ></input>
                                    <button type="button" onClick={handleImageUpload} className="btnRight">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btnLeft">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UserProfile;
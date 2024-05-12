"use client";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { BASE_API_URL } from "../../../../utils/constant";


interface UserProfileProps{
    proData: ProfileType;
}

type ProfileType = {
    _id:string;
    usrAddress:string
    usrImage:string
}

interface IProfileType{
    usrAddress:string
    usrImage:string
}

const UserProfile :React.FC<UserProfileProps> = ({proData}) => {

    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<IProfileType>({usrImage:proData.usrImage, usrAddress:proData.usrAddress});

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
console.log('image'+image);
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
            data.usrImage = formData.secure_url;
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
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/profile/${proData._id}`, {
            method: 'PUT',
            body: JSON.stringify(
                { 
                    usrImage: data.usrImage, 
                    usrAddress: data.usrAddress, 
                }
            ),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error("Data saving failed!");
        } else {
            toast.success('Saved successfully!');
         }
    } catch (error) {
        toast.error('Error saving data.');
    } 
    };

    return ( 
        <div>
           <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-bold">PROFILE SETTING</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-9">
                        <div className="w-auto border-[1.5px] border-gray-300 rounded-md">
                            <Image alt="profile" src={proData.usrImage} width={550} height={350}/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">Address:</label>
                                <textarea  name="usrAddress" value={data.usrAddress} onChange={handleChange} className="inputBox" ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">Image:</label>
                                <div className="flex gap-1">
                                    <input type="file" name="usrImage" accept='image/*' value={data.usrImage} onChange={(e)=>handleChangeImage(e.target.files)} className="inputBox w-full" ></input>
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
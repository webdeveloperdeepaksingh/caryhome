"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BASE_API_URL } from "../../../../../utils/constant";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import toast from "react-hot-toast";

interface ISettingParams {
    SettId?: string;
}

type SettType = {
    _id?: string;
    webTitle: string;
    webTags: string[];
    metaData: string;
}
    
export default function Settings ({params}:{params : ISettingParams}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<SettType>({webTitle:'', webTags:[], metaData:'' });

    useEffect(()=>{
    async function fetchSettData(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/setting/${params.SettId}`,{ cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch settData.');
            }   
            const settingData = await res.json();
            setData(settingData.settingData);
     
        } catch (error) {
            console.error("Error fetching settData: ", error);
        }finally{
            setIsLoading(false);
        }
    };
    fetchSettData();
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement> ): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/setting/${params.SettId}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                webTitle: data.webTitle, 
                webTags: data.webTags, 
                metaData: data.metaData 
            }),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error('Error saving data.');
        } else {
            toast.success('Settings changed successfully!'); 
            router.refresh();    
         }
    } catch (error) {
        console.error("Error saving settData: ", error);
    } 
    }; 

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }

    return ( 
        <div>
            <title>SEO SETTINGS</title>
           <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-semibold">SEO SETTING</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Web Title:</label>
                        <input type="text" name="webTitle" value={data.webTitle} onChange={handleChange} className="inputBox" placeholder="Web Title"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Web Tags:</label>
                        <input type="text" name="webTags" value={data.webTags} onChange={handleChange} className="inputBox" placeholder="Web Tags"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Meta Data:</label>
                        <input type="text" name="metaData" value={data.metaData} onChange={handleChange} className="inputBox" placeholder="Meta Data - 160 char..."></input>
                    </div>
                    <div>
                        <button type="submit" className="btnLeft">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
 
"use client";
import { BASE_API_URL } from "../../../../utils/constant";
import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useState } from "react";

interface SettingPageProps {
    settData: SettType;
}

type SettType = {
    _id?: string;
    webTitle: string;
    webTags: string[];
    metaData: string;
}

interface ISettType {
    webTitle: string;
    webTags: string[];
    metaData: string;
}

const SettingPage:React.FC<SettingPageProps> = ({settData}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ISettType>({webTitle:settData.webTitle, webTags:settData.webTags, metaData:settData.metaData });

    const handleChange = (e:ChangeEvent<HTMLInputElement> ): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    setIsLoading(true);  
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/setting/${settData._id}`, {
        method: 'PUT',
        body: JSON.stringify({ webTitle: data.webTitle, webTags: data.webTags, metaData: data.metaData }),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error('Error saving data.');
        } else {
            toast.success('Settings saved successfully!');     
         }
    } catch (error) {
        console.error("Error saving settData: ", error);
    } finally {
        setIsLoading(false);
      }
    };  

    return ( 
        <div>
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
 
export default SettingPage;
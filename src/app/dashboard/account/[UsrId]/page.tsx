"use client";
import { NextPage } from "next";
import toast from "react-hot-toast";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { BASE_API_URL } from "../../../../../utils/constant";
import { useRouter } from "next/navigation";
import Loading from "./Loading";


 interface IAccountParams {
    params : {
        UsrId?: string;
    };
}

type AccType = {
    _id?:string;
    usrName: string;
    usrEmail: string;
    usrRole:string;
    usrPhone: string;
}

const Account : NextPage <IAccountParams> = ({params}) => {


    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<AccType>({usrName: '', usrEmail:'', usrRole:'', usrPhone:''});

    useEffect(()=>{
    async function fetchAccountData(){
        try 
            {
                const res = await fetch(`${BASE_API_URL}/api/account/${params.UsrId}`, {cache: "no-store"});

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                
                const accountData = await res.json();
                setData(accountData.accData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAccountData();
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    setErrorMessage(''); // Clear the previous error
    let errMsg: string[] = [];
    
    if (!data.usrName.trim()) {
        errMsg.push('Username is required.');
    }
    if (!data.usrEmail.trim()) {
        errMsg.push('Email Id is required.');
    }
    
    if (errMsg.length > 0) {
        setErrorMessage(errMsg.join(' || '));
        return;
    }
    
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/account/${params.UsrId}`, {
            method: 'PUT',
            body: JSON.stringify(
                { 
                    usrName: data.usrName, 
                    usrEmail: data.usrEmail, 
                    usrRole: data.usrRole,
                    usrPhone: data.usrPhone, 
                }
            ),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error('Account saving failed!');
        } else {
            toast.success('Account saved successfully!');
        }
    } catch (error) {
        toast.error('Error saving data.');
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
                    <h1 className="font-bold">ACCOUNT SETTING</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Username:*</label>
                        <input type="text" name="usrName" value={data.usrName} onChange={handleChange} className="inputBox" placeholder="keshav123"></input>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Email Id:*</label>
                            <input type="email" name="usrEmail" value={data.usrEmail} onChange={handleChange} className="inputBox" placeholder="coachdeepak@gmail.com"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">User Role:*</label>
                            <input type="text" disabled name="usrRole" value={data.usrRole} onChange={handleChange} className="inputBox" ></input>
                        </div>
                    </div>
                    <div className="flex flex-col mb-3 gap-2">
                        <label className="font-semibold">Phone:</label>
                        <input type="text" name="usrPhone" value={data.usrPhone} onChange={handleChange} className="inputBox" placeholder="with country code: e.g- 91"></input>
                    </div>
                    {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                    <div className="mt-3">
                        <button type="submit" className="btnLeft">SAVE</button>
                    </div>
                </form>
            </div>  
        </div>
     );
}
export default Account;

  
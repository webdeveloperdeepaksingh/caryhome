"use client";
import { useState } from "react";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../../../../utils/constant";

interface ChangePasswordProps {
    accData:any;
}

interface IChangePasswordType{
    usrPass: string;
    newPass: string;
    confPass: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({accData}) => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState<IChangePasswordType>({usrPass: "", newPass:"", confPass:""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };

    const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); //Clear the previous error
    let errMsg=[];
    
    if (!data.usrPass.trim()) {
        errMsg.push('Old Password is required.');    
    }
    
    if (!data.newPass.trim()) {
        errMsg.push('New password is required.');    
    }
    
    if (!data.confPass.trim()) {
        errMsg.push('Confirm password is required.');    
    }
    
    
    if(errMsg.length>0){
        setErrorMessage(errMsg.join(' || '));
        return;
    }
    
    try
    {
        const result = await fetch (`${BASE_API_URL}/api/account/${accData._id}`, 
        {
        method:'PUT',
        body:JSON.stringify
        ({
            usrPass: data.usrPass, 
            newPass:data.newPass, 
            confPass:data.confPass, 
            isPasswordChangeRequest: true}),
        });
    
        const post = await result.json();
        
        if(post.success === false){    
            toast.error(`${post.msg}`);
        } else{
            toast.success(`${post.msg}`);
        }
    }catch(error){
        console.log(error);    
        }    
    }

    return ( 
        <div>
            <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-bold">CHANGE PASSWORD</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Old Password:*</label>
                        <input type="password" name="usrPass" value={data.usrPass}  onChange={handleChange} className="inputBox" ></input>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">New Password:*</label>
                            <input type="password" name="newPass" value={data.newPass}  onChange={handleChange} className="inputBox" ></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Confirm Password:*</label>
                            <input type="password" name="confPass" value={data.confPass} onChange={handleChange} className="inputBox" ></input>
                        </div>
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
 
export default ChangePassword;
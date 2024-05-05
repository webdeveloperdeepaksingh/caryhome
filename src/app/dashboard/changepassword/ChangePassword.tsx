"use client";
import { useState } from "react";

const ChangePassword = () => {

    const [errorMessage, setErrorMessage] = useState();

    const handleChange = () => {

    }

    const handleSubmit = () => {

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
                        <input type="password" name="usrName"  onChange={handleChange} className="inputBox" ></input>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">New Password:*</label>
                            <input type="password" name="usrEmail"  onChange={handleChange} className="inputBox" ></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Confirm Password:*</label>
                            <input type="password" name="usrRole" onChange={handleChange} className="inputBox" ></input>
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
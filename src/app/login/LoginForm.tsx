"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";
import Cookies from 'js-cookie';
import { BASE_API_URL } from "../../../utils/constant";
 
type LoginType = {
    usrName: string;
    usrPass: string;
}

const LoginForm  = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState<LoginType>({usrName:'', usrPass:''});

    const handleChange = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser((prev) =>{
        return {
            ...prev, [name]: value
        }
      }); 
    }
    
    const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(''); //Clear the previous error
      let errMsg=[];
      
      if (!user.usrName?.trim() || '') {
        errMsg.push('User name is required.');    
      }
      
      if (!user.usrPass?.trim() || '') {
        errMsg.push('Password is required.');    
      }
    
      if(errMsg.length>0){
        setErrorMessage(errMsg.join(' || '));
        return;
      }
    
      try
      {
        const result = await fetch (`${BASE_API_URL}/api/login`, 
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({usrName: user.usrName, usrPass:user.usrPass}),
        });
    
        const post = await result.json();
         
        if(post.success === false){   
            toast.error("Invalid username or password!");    
          }else{  
            Cookies.set("loggedInUserId", post.result.id); 
            Cookies.set("loggedInUserRole", post.result.role);
            Cookies.set("token", post.result.userToken);
            toast.success("Logged in successfully.");     
            router.push('/dashboard/home');
          }
      }catch(error){
          console.log(error);    
        }    
      }
  
    return ( 
        <div>
            <form className="flex flex-col w-[450px] p-9 gap-3 border-[1.5px] border-indigo-800 shadow-lg rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="usrName" className="text-sm mb-2">Username or Email:*</label>
                    <input type="text" className="inputBox" name="usrName" value={user.usrName} onChange={handleChange} placeholder="coachdeepak@gmail.com"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passWord" className="text-sm mb-2">Password:*</label>
                    <input type="password" className="inputBox" name="usrPass" value={user.usrPass} onChange={handleChange} placeholder="password"></input>
                </div>
                <button type="button"  className="btnRight flex gap-2 items-center w-full justify-center">
                    <AiOutlineGoogle size={24}/>Continue with Google
                </button>
                {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                <button type="submit" className="btnLeft w-full" >
                    Login
                </button>
                <p className="text-sm">
                    Dont have an account? 
                    <Link href="/register" className="underline ml-2">
                        Register
                    </Link>
                </p>
            </form>
        </div>
     );
}
 
export default LoginForm;
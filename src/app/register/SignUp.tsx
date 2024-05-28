"use client";
import { BASE_API_URL } from "../../../utils/constant";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";
 
interface SignUpType  {
    usrName:string, 
    usrEmail:string, 
    usrPass:string, 
    confPass:string,
}

const SignUp : React.FC  = () => {

    const router = useRouter();
    const [data, setData] = useState<SignUpType>({usrName:'', usrEmail:'', usrPass:'', confPass:''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) =>{
        return {
            ...prev, [name]: value
        }
      }); 
    }
    
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      setErrorMessage(''); //Clear the previous error
      let errMsg=[];
      
      if (!data.usrName?.trim() || '') {
        errMsg.push('User name is required.');    
      }
      
      if (!data.usrPass?.trim() || '') {
        errMsg.push('Password is required.');    
      }
    
      if (!data.confPass?.trim() || '') {
        errMsg.push('Confirm password is required.');    
      }
      
      if (!data.usrEmail?.trim() || '') {
        errMsg.push('Email is required.');    
      }
    
      if(errMsg.length>0){
        setErrorMessage(errMsg.join(' || '));
        return;
      }
    
      try
      {
        const result = await fetch (`${BASE_API_URL}/api/register`, 
        {
          method:'POST',
          body:JSON.stringify(
            {
                usrName: data.usrName, 
                usrPass:data.usrPass, 
                confPass:data.confPass, 
                usrEmail:data.usrEmail
            }),
        });
    
        const post = await result.json();
         
        if(post.success === false){      
            toast.error(`${post.msg}`);      
        }else{
            toast.success(`${post.msg}`);
            router.push('/login');
          }
      }catch(error){
          console.log(error);    
        }    
      }

    return ( 
        <div>
            <title>SIGNUP</title>
            <div className="p-6 md:p-0">
            <form className="flex flex-col max-w-[500px] p-9 gap-3 shadow-lg rounded-md border-[1.5px] border-indigo-800" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="usrName" className="text-sm mb-2">Username:*</label>
                    <input type="text" className="inputBox" name="usrName" value={data.usrName} onChange={handleChange} placeholder="coachdeepak"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="usrName" className="text-sm mb-2">Email Id:*</label>
                    <input type="text" className="inputBox" name="usrEmail" value={data.usrEmail} onChange={handleChange} placeholder="coachdeepak@gmail.com"></input>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div className="flex flex-col">
                      <label htmlFor="createPass" className="text-sm mb-2">Create Password:*</label>
                      <input type="password" className="inputBox" name="usrPass" value={data.usrPass} onChange={handleChange} placeholder="min-8 alphaNum char."></input>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="confPass" className="text-sm mb-2">Confirm Password:*</label>
                      <input type="password" className="inputBox" name="confPass" value={data.confPass} onChange={handleChange} placeholder="min-8 alphaNum char."></input>
                  </div>
                </div>
                <button type="button"  className="btnRight flex gap-2 items-center w-full justify-center">
                    <AiOutlineGoogle size={24}/>Continue with Google
                </button>
                {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                <button type="submit" className="btnLeft w-full" >
                    Sign Up
                </button>
                <p className="text-sm">
                    Already have an account? 
                    <Link href="/login" className="underline ml-2">
                        Login
                    </Link>
                </p>
            </form>
          </div>
        </div>
     );
}
 
export default SignUp;
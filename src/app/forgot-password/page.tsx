"use client";
import { BASE_API_URL } from "../../../utils/constant";
import toast from "react-hot-toast";
import { useState } from "react";


interface IForgotPass {
    usrEmail:string;
}

const ForgotPassword = () => {

    const [pwd, setPwd] = useState<IForgotPass>({usrEmail:''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e:any) =>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setPwd((prev) =>{
            return {...prev,[name]:value  }
        });
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(''); //Clear the previous error
        let errMsg=[];
        
        if (!pwd.usrEmail?.trim() || '') {
          errMsg.push('Please enter your email.');    
        }
      
        if(errMsg.length>0){
          setErrorMessage(errMsg.join(' || '));
          return;
        }
      
        try
        {
          const result = await fetch (`${BASE_API_URL}/api/forgot-password`, 
          {
            method:'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({usrEmail: pwd.usrEmail}),
          });

          const post = await result.json();      
          
          if(post.success === false){    
                toast.error(`${post.msg}`);    
            }else{
              toast.success(`${post.msg}`);
            }
        }catch(error){
            console.log(error);    
          }    
        }

    return ( 
        <div>
        <div className='flex w-auto h-screen justify-center items-center px-9'>
           <form className="flex flex-col p-6 max-w-[360px] h-auto shadow-xl border-[1.5px] border-indigo-800 rounded-lg" onSubmit={handleSubmit}>
               <span className='text-center p-3 bg-gray-200 font-bold rounded-md mb-3'>PASSWORD RESET REQUEST</span>
               <div className='flex flex-col gap-2 mb-3'>
                   <label className="block font-semibold">Email Id: </label>
                   <input type="email" name='usrEmail' value={pwd.usrEmail} onChange={handleChange} placeholder="Enter your registered email id." className="inputBox"/>
               </div>
               {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
               <button type='submit' className='btnLeft'>SUBMIT</button>
           </form> 
        </div>
     </div>
     );
}
 
export default ForgotPassword;
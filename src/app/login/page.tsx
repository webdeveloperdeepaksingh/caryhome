"use client";
import { NextPage } from "next";
import { BASE_API_URL } from "../../../utils/constant";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";
import Cookies from 'js-cookie';
import Container from "@/components/Container";
import Link from "next/link";
import toast from "react-hot-toast";
import { Suspense, useState } from "react";
import Loading from "./Loading";
 
interface LoginType {
    usrName: string;
    usrPass: string;
}

const LoginPage : NextPage = () => {

    const urlSearchParams = useSearchParams();    
    const navigate = urlSearchParams.get('navigate');
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
            
            if(navigate && navigate==="checkout"){
              router.push('/cart');  
            }
            else{
              toast.success("Logged in successfully."); 
              router.push('/dashboard/home');
            }            
          }
      }catch(error){
          console.log(error);    
        }    
      }

    return ( 
        <div>
            <Container>
                <title>LOGIN</title>
                <div className="flex mx-auto h-screen items-center justify-center">
                    <div className="flex w-auto p-6 md:p-0">
                        <form className="flex flex-col max-w-[650px] p-9 gap-3 border-[1.5px] border-indigo-800 shadow-lg rounded-md" onSubmit={handleSubmit}>
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
                            <div className="flex flex-col items-center">
                            <div className="flex gap-2 items-center">
                                <p className="text-sm">Dont have an account?</p> 
                                <Link href="/register" className="text-sm">
                                    Register
                                </Link>
                            </div>
                            <div className="text-sm"> 
                                <Link href="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
     );
}

export default LoginPage;

export const Login = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  );
};



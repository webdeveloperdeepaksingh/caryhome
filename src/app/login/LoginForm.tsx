"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";


interface LoginFormProps {
    loggedInUserId?: string | null;
}

const LoginForm :  React.FC<LoginFormProps> = ({loggedInUserId}) => {

    const router = useRouter();

    return ( 
        <div>
            <form className="flex flex-col w-[450px] p-9 gap-3 shadow-lg rounded-md">
                <div className="flex flex-col">
                    <label htmlFor="usrName" className="text-sm mb-2">Username or Email:*</label>
                    <input type="text" className="inputBox" name="usrName" placeholder="coachdeepak@gmail.com">
                    
                    </input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passWord" className="text-sm mb-2">Password:*</label>
                    <input type="password" className="inputBox" name="passWord" placeholder="password">
                    
                    </input>
                </div>
                <button type="button"  className="btnRight flex gap-2 items-center w-full justify-center">
                    <AiOutlineGoogle size={24}/>Continue with Google
                </button>
                <button type="button" className="btnLeft w-full" >
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
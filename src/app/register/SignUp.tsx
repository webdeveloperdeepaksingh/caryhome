"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai";

interface SignUpProps {
    loggedInUserId : string;
}

const SignUp : React.FC<SignUpProps> = ({loggedInUserId}) => {

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
                    <label htmlFor="createPass" className="text-sm mb-2">Create Password:*</label>
                    <input type="password" className="inputBox" name="createPass" placeholder="min-8 alphaNumeric char."></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confPass" className="text-sm mb-2">Confirm Password:*</label>
                    <input type="password" className="inputBox" name="confPass" placeholder="min-8 alphaNumeric char."></input>
                </div>
                <button type="button"  className="btnRight flex gap-2 items-center w-full justify-center">
                    <AiOutlineGoogle size={24}/>Continue with Google
                </button>
                <button type="button" className="btnLeft w-full" >
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
     );
}
 
export default SignUp;
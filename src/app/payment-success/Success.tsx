"use client";
import React, {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Loading from './Loading';

const Success = () => {
    
    const [isLoading, setIsLoading] = useState<boolean>(true);  
    const [paymentId, setPaymentId] = useState<string | null>(null); 

    useEffect(()=>{
      if (typeof window !== 'undefined' && window.location) {
          const searchParamsString = window.location.search;
          const searchParams = new URLSearchParams(searchParamsString);
          const pymtId = searchParams.get('paymentId');
          setPaymentId(pymtId);
          setIsLoading(false);
      } else {
         console.error("window.location is not available in this environment.");
      }
    },[])

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    };

    if(isLoading){
      return <div>
        <Loading/>
      </div>
    }

  return (
    <div>
        <div className="flex flex-col gap-3 h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-2 border-[1.5px] border-x-indigo-800 rounded-md shadow-lg p-4">
                <div className="font-bold">Payment successful!</div>
                <span className="block sm:inline">Your paymentID= {paymentId} has been processed.</span>       
            </div>
            <Link href={`/dashboard/myorders/${loggedInUser.result._id}`} className='btnRight'>
                    View Your Orders
            </Link>
        </div>
    </div>
  )
}
export default Success;



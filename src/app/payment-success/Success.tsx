"use client";
import React, { Suspense } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Loading from './Loading';
import { useSearchParams } from 'next/navigation';

const Success = () => {
    
    const searchParams = useSearchParams();
    const paymentid = searchParams.get('paymentid');

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    };

  return (
    <div>
        <div className="flex flex-col gap-3 h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-2 border-[1.5px] border-x-indigo-800 rounded-md shadow-lg p-4">
                <div className="font-bold">Payment successful!</div>
                <span className="block sm:inline">Your paymentID= {paymentid} has been processed.</span>       
            </div>
            <Link href={`/dashboard/myorders/${loggedInUser.result._id}`} className='btnRight'>
                    View Your Orders
            </Link>
        </div>
    </div>
  )
}

export default function PaymentSuccess() {
    return (
      <Suspense fallback={<div><Loading /></div>}>
        <Success />
      </Suspense>
    );
  }

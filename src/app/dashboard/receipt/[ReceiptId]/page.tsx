"use client";
import { NextPage } from "next";
import { formatPrice } from "../../../../../utils/formatPrice";
import Cookies from "js-cookie";
import BrandLogo from "@/components/nav/navitems/BrandLogo";
import { BASE_API_URL } from "../../../../../utils/constant";
import { useEffect, useState } from "react";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loading from "./Loading";

interface IPaymentParams {
    params: {
        ReceiptId?: string;
    }
}

interface PaymentReceiptProps {
    _id?: string;
    usrProducts:ProdType[];
    razorpay_payment_id:string;
    razorpay_order_id:string;
    orderAmount:string;
    createdAt: string;
}

type ProdType = {
    prodId: string;
    prodName:string;
    prodPrice:number;
    prodQty: number;
    prodColor: string;
    prodTotalPrice:number;
}

type UserType = {
    _id?:string;
    usrName: string;
    usrPhone: string;
    usrAddress: string;
}

const PaymentReceipt : NextPage<IPaymentParams> = ({params}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserType>({usrName:'', usrAddress:'', usrPhone:''});
    const [data, setData] = useState<PaymentReceiptProps>({usrProducts: [], orderAmount:'', razorpay_order_id:'', razorpay_payment_id:'', createdAt:''});
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    };

    useEffect(()=>{
    async function fetchPaymentData(){
        try {
            const res = await fetch(`${BASE_API_URL}/api/receipt/${params.ReceiptId}`, {cache: "no-store"});
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const paymentData = await res.json();
            setData(paymentData.pymtData);
            console.log(data);
        } catch (error) {
            console.error("Error fetching payment data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchPaymentData();
    },[])

    useEffect(()=>{
    async function fetchUserData(){
        try {
            const res = await fetch(`${BASE_API_URL}/api/account/${loggedInUser.result?._id}`, {cache: "no-store"});
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const userData = await res.json();
            setUserData(userData.accData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchUserData();
    },[])

    if(isLoading){
        return <div>
            <Loading/>
        </div>
    }

    return ( 
        <div>
            <div ref={componentRef}  className="grid grid-cols-1 gap-3 max-w-[900px] mx-auto border-[1.5px] border-indigo-800 p-6 rounded-md shadow-lg">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 items-center border-b-[1.5px] border-black">
                    <div className="flex flex-col pb-4">
                        <BrandLogo/>                        
                        <p className="italic mt-3">Billed to - </p>
                        <p className="uppercase font-bold italic mb-2">{userData.usrName}</p>
                        <p className="italic">{userData.usrAddress}</p>
                        <p className="italic">{userData.usrPhone}</p>                        
                    </div>                                       
                    <div className="flex flex-col ml-auto italic">
                        <div className="md:flex gap-2">
                            <p className="italic font-semibold">Payment Id:</p>
                            <p>{data.razorpay_payment_id}</p>
                        </div>
                        <div className="md:flex gap-2">
                            <p className="italic font-semibold">Order Id:</p>
                            <p>{data.razorpay_order_id}</p>
                        </div>
                        <div className="md:flex gap-2">
                            <p className="italic font-semibold">Date:</p>
                            <p>{data.createdAt.toLocaleString()}</p>
                        </div>
                    </div>                  
                </div>
                <div className="relative md:flex py-3 border-b-[1.5px] border-black">
                    {
                        data?.usrProducts.map((item:any, index:any)=>{
                            return (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                                    <div className="flex gap-3">
                                        <div>
                                            {index + 1}.
                                        </div>
                                        <div>
                                            {item.prodName}
                                        </div>
                                    </div>
                                    <div >
                                        {item.prodColor}
                                    </div>
                                    <div>
                                        {formatPrice(item.prodPrice)}
                                    </div>
                                    <div>
                                        {item.prodQty}
                                    </div>
                                    <div className="flex absolute right-0">
                                        {formatPrice( item.prodTotalPrice)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex">
                    <div className="flex gap-2 ml-auto">
                        <p className="italic font-semibold">Taxable Value:</p>
                        <p>{formatPrice(Number(data.orderAmount))}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex gap-2 ml-auto">
                        <p className="italic font-semibold">Shipping:</p>
                        <p>{formatPrice(370)}</p>
                    </div>
                </div> 
                <div className="flex pb-3 border-b-[1.5px] border-black">
                    <div className="flex gap-2 ml-auto">
                        <p className="italic font-semibold">Tax [6%]:</p>
                        <p>{formatPrice(Number(data.orderAmount) * .06)}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                    <div className="flex gap-2">
                        <p className="italic font-semibold">Net Payment:</p>
                    </div>
                    <div className="flex ml-auto" >
                        <p>{formatPrice((Number(data.orderAmount)) + (Number(data.orderAmount) * .06) + (370))}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 italic">
                    <div className="relative">
                        <p className="mb-3 absolute bottom-[-15px]">Happy to serve you...!</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">CARRYHOME | Electronic shop.</p>
                        <p>D-27/1, Bagban Society, Noida - 201006 U.P</p>
                        <p>www.carryhome.vercel.app</p>
                        <p>Phone : 7698547812</p>
                    </div>
                </div>
                <div>
                    <button type="button" className="btnRemove" onClick={handlePrint}>
                        PRINT
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default PaymentReceipt;
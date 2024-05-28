"use client";
import toast from "react-hot-toast";
import BuyProduct from "@/components/razorpay/BuyProduct";
import { BASE_API_URL } from "../../../../utils/constant";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import Loading from "./Loading";


interface IAccountParams {
    UsrId?: string;
}

type StoreType = {
    store: unknown
    cart:any;
}

interface CheckoutProps {
    usrAddress:string;
}

export default function Checkout({params}:{params:IAccountParams}){

    const [data, setData] = useState<CheckoutProps>({usrAddress:''});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
 

    useEffect(()=>{
    async function fetchAccountData(){
        try 
            {
                const res = await fetch(`${BASE_API_URL}/api/account/${params.UsrId}`, {cache: "no-store"});

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                
                const accountData = await res.json();
                setData(accountData.accData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAccountData();
    },[])

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateAddress = async (e:any) => {
    e.preventDefault();   
        setErrorMessage(''); // Clear the previous error
        let errMsg: string[] = [];
        
        if (!data.usrAddress.trim()) {
            errMsg.push('Address is required.');
        }
        
        if (errMsg.length > 0) {
            setErrorMessage(errMsg.join(' || '));
            return;
        }
        
        try 
        {
            const response = await fetch(`${BASE_API_URL}/api/account/${params.UsrId}`, {
                method: 'PUT',
                body: JSON.stringify({ usrAddress: data.usrAddress }),
            });
        
            const post = await response.json();
            console.log(post);
        
            if (post.success === false) {
                toast.error(`${post.msg}`);
            } else {
                toast.success('Address updated successfully!');
            }
        } catch (error) {
            console.error('Error updating address.', error);
        } 
    };

    if(isLoading){
        return<div>
            <Loading/>
        </div>
    }
    
    return ( 
        <div>
            <Container>
                <FormWrap>
                    <form >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h2 className="text-lg mt-4 mb-2 uppercase font-bold">Address Details:</h2>
                                <textarea name="usrAddress" value={data.usrAddress} onChange={handleChange} className="inputBox w-full" rows={3}>{data.usrAddress}</textarea>
                            </div>
                            {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                            <div className="grid grid-cols-2 gap-1">
                                <button type="submit" className="btnLeft" onClick={handleUpdateAddress}>Update</button>
                                <BuyProduct/>
                            </div>
                        </div>
                    </form>
                </FormWrap>
            </Container>   
        </div>
     );
}

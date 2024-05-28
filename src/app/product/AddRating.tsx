"use client";
import toast from "react-hot-toast";
import { Rating } from "@mui/material";
import Heading from "@/components/Heading";
import { BASE_API_URL } from "../../../utils/constant";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AddRatingProps {
    prodById: any 
}

type OrderType = {
    usrId: string,
    usrProducts:string[],
    razorpay_order_id: string,
    razorpay_payment_id: string,
    orderAmount:string
}

const AddRating: React.FC<AddRatingProps> = ({prodById}) => {

    const [orderData, setOrderData] = useState<OrderType[]>([]);
    const router = useRouter();
    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    }; 

    useEffect(()=>{
    async function fetchOrderList(){      
        try 
            {               
                const res = await fetch(`${BASE_API_URL}/api/myorder/${loggedInUser.result._id}` , {cache:'no-store'});
    
                if(!res.ok){
                    throw new Error("Error fetching prodList.");
                }
    
                const orderList = await res.json();
                setOrderData(orderList.orderByUserId);
    
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchOrderList();
    },[]);

    const [rateItem, setRateItem] = useState<number>(0);
    const [commentItem, setCommentItem] = useState<string>("");

    const setCustomValue = (id:string, value: any) => {
        setRateItem(value);      
    }

    const handleSubmit = async (e:any) => {
    e.preventDefault();
       
    try 
    {
        const response = await fetch(`${BASE_API_URL}/api/rating/${prodById._id}`, {
        method: 'PUT',
        body: JSON.stringify(
            { 
                rating:rateItem,
                comment:commentItem,
                userId:loggedInUser.result._id
            }
        ),
        });
    
        const post = await response.json();
        console.log(post);
    
        if (post.success === false) {
            toast.error("Product rating failed.");
        } else {
            toast.success('Product rated successfully!');
            router.push(`/product/${prodById._id}`);
        }

    } catch (error) {
        console.error('Product updation failed.', error);
    } 
}

if(loggedInUser.result._id){
    let isPurchased=orderData?.filter((a:any) => a?.usrProducts?.filter((b:any)=> b.prodId===prodById._id).length>0).length>0;
    let isReviewed=prodById.prodReviews?.filter((a:any)=>a.userId===loggedInUser.result._id).length>0;
    if(isPurchased === true && isReviewed===false)
        {
    return ( 
        <div className="flex flex-col gap-2 max-w-[500px] p-6">
            <Heading title="Rate this product."/>
            <Rating onChange={(event, newValue) => {
                setCustomValue('rating', newValue)
            }}/>
            <input type="text" className="inputBox" onChange={(e:any)=>setCommentItem(e.target.value)}></input>
            <button type="submit" className="btnRight" onClick={handleSubmit}>Rate Product</button>
        </div>
     );
    }
}
}
 
export default AddRating;

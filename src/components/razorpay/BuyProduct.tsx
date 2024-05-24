"use client";
import { BASE_API_URL } from "../../../utils/constant";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { clearCartItems } from "../../../redux/slices/cartSlice";
import { useRouter  } from 'next/navigation';
import Loading from "./Loading";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { CartItemType } from "@/app/product/ProductDetails";

type StoreType = {
  store: unknown
  cart:any;
}

const BuyProduct = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((store:StoreType) => store.cart);


  const makePayment = async () => {
    // "use server"
    const key = process.env.RAZORPAY_API_KEY;

    const loggedInUser = {
      result:
      {
          _id:Cookies.get("loggedInUserId"),
          usrRole:Cookies.get("loggedInUserRole"),
      }
  }; 
    console.log(key);

    const subTotal : number = cartItems.totalPrice;
    const tax : number= .06 * subTotal;
    const shippingCharge : number = 370;

    // Make API call to the serverless API
    const data = await fetch(`${BASE_API_URL}/api/razorpay?amtToPay=${subTotal+tax+shippingCharge}`);
    const { order } = await data.json();
    console.log(order.id);
    const options = {
      key: key,
      name: "CARYHOME",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Purchase Order | Carryhome",
      // image: logoBase64,
      handler: async function (response:any) {
        // if (response.length==0) return <Loading/>;
        console.log(response);
        const data = await  fetch(`${BASE_API_URL}/api/verifypayment`, {
          method: "POST",
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            usrId:loggedInUser.result._id,
            usrProducts:cartItems.items,
            orderAmount:(subTotal+tax+shippingCharge)
          }),
        });
        const res = await data.json();
        console.log("response verify==",res);

        if(res?.msg=="success")
        {
          dispatch(clearCartItems());
          router.push("/payment-success?paymentid=" + response.razorpay_payment_id)
        }
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "CARRYHOME",
        email: "info@carryhome.com",
        contact: "9318736167",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
        <Suspense fallback={<Loading/>}>
            <Buy makePayment={makePayment} />
        </Suspense> 
    </>
  );
};

export default BuyProduct;

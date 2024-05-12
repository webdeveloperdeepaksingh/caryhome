"use client";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
  
type StoreType = {
    store: unknown
    cart:any;
}

const CheckoutClient = () => {

    const cartItems =  useSelector((store:StoreType) => store.cart);
    const [paymentIntent, handleSetPaymentIntent]  = useState(); //wrong, should come from redux
    const [paymentSuccess, setPayementSuccess] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    useEffect(()=>{
        if(cartItems){
            console.log('paymentintent')
            console.log(paymentIntent);
            setLoading(true)
            setError(false)
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    items:cartItems,
                    payment_intent_id: paymentIntent
                })
            }).then((res) =>{
                console.log('paymentintentresponse')
                console.log(res);
                setLoading(false)
                if(res.status === 401){
                    return router.push('/login')
                }
                return res.json()
            }).then((data)=>{
                console.log('responsedata')
                console.log(data)
                setClientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error)=>{
                setError(true);
                toast.error("Something went wrong"); 
                console.log(error);   
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartItems, paymentIntent]);

    const options : StripeElementsOptions = {
        clientSecret, 
        appearance:{
            theme:  "stripe",
            labels: "floating",
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPayementSuccess(value);
        console.log("sucess");
0    },[]);

    return ( 
        <div className="w-full ">
            {
                clientSecret && cartItems && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm 
                         clientSecret={clientSecret} 
                         handleSetPaymentSuccess={handleSetPaymentSuccess}
                        />
                     </Elements>
                )
            }
            {loading && <div className="text-center">Loading Checkout...</div>}
            {error && <div className="text-center text-rose-500">Something went wrong...! </div>}
            {
                paymentSuccess && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-green-500">Payment Successfull.</div>
                        <div className="max-w-[220px] w-full">
                            <button type="button" className="btnRight" onClick={()=>router.push('/dashboard/myorders')}>
                                View your order
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
     );
}
 
export default CheckoutClient;
"use client";
import {AddressElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import { formatPrice } from "../../../utils/formatPrice";
import { clearCartItems, handleSetPaymentIntent } from "../../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import toast from "react-hot-toast";

type StoreType = {
    store: unknown
    cart:any;
}

interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void,
}

const CheckoutForm : React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const cartItems =  useSelector((store:StoreType) => store.cart);
    const formattedPrice = formatPrice(cartItems.totalPrice);

    useEffect(() => {
        if(!stripe){
            return;
        }
        if(!clientSecret){
            return;
        }
        handleSetPaymentSuccess(false)
    },[stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true)
        stripe.confirmPayment({
            elements, 
            redirect: "if_required",
        }).then((result)=>{
            if(!result.error){
                toast.success("Checkout Successfull.");
                dispatch(clearCartItems());
                handleSetPaymentSuccess(true);
                dispatch(handleSetPaymentIntent(null));
            }
            setIsLoading(false);
        });
    }

    return ( 
        <div>
             <div>
                <form onSubmit={handleSubmit} id="payment-form">
                    <h2 className="text-lg mt-4 mb-2 uppercase font-bold">
                        Address Details:
                    </h2>
                    <AddressElement options={{mode:"shipping", allowedCountries: ["IND"],}}/>
                        <h2 className="text-lg mt-4 mb-2 uppercase font-bold">
                            Payment Details:
                        </h2>
                    <PaymentElement id="payment-element" options={{layout: "tabs"}}/>
                    <div className="py-4 text-center text-md font-bold">
                            Total: {formattedPrice}
                    </div>
                    <button type="submit" className="btnLeft w-full" disabled={isLoading || !stripe || !elements}>
                        {isLoading ? "Processing" : "Pay Now"}
                    </button>
                </form>
            </div> 
        </div>
     );
}
 
export default CheckoutForm;
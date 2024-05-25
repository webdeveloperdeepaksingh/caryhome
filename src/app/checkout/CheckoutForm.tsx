"use client";
import BuyProduct from "@/components/razorpay/BuyProduct";
import { formatPrice } from "../../../utils/formatPrice";
import { BASE_API_URL } from "../../../utils/constant";
import { clearCartItems} from "../../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

type StoreType = {
    store: unknown
    cart:any;
}

interface CheckoutFormProps{
    accData:any;
}

const CheckoutForm : React.FC<CheckoutFormProps> = ({accData}) => {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState({usrAddress:accData.usrAddress});
    const cartItems =  useSelector((store:StoreType) => store.cart);
    const formattedPrice = formatPrice(cartItems.totalPrice);

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
            const response = await fetch(`${BASE_API_URL}/api/account/${accData._id}`, {
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

    return ( 
        <div>
             <div>
                <form >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col w-full">
                            <h2 className="text-lg mt-4 mb-2 uppercase font-bold">Address Details:</h2>
                            <textarea name="usrAddress" value={data.usrAddress} onChange={handleChange} className="inputBox" rows={3}>{accData.usrAddress}</textarea>
                        </div>
                        {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                        <div className="grid grid-cols-2 gap-1">
                            <button type="submit" className="btnLeft" onClick={handleUpdateAddress}>Update</button>
                            <BuyProduct/>
                        </div>
                    </div>
                </form>
            </div> 
        </div>
     );
}
 
export default CheckoutForm;
"use client";
import { useRouter } from "next/navigation";

const EmptyCart = () => {

    const router = useRouter();
    return ( 
        <div>           
            <div className="flex flex-col items-center h-screen">
                <div className="text-lg font-semibold mb-4">
                    <p>Your cart is empty.</p> 
                </div>
                <div >
                    <button type="button" onClick={()=> router.push('/')}  className="btnLeft ">Shop Now...</button>
                </div>
            </div>         
       </div>
     );
}
 
export default EmptyCart;
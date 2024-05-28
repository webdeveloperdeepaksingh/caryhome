"use client";
import Link from "next/link";
import Image from "next/image";

const BrandLogo : React.FC = () => {
    return ( 
        <div className="border-r-[1.5px] border-indigo-800 pr-5">     
            <Link href="/">
                <Image alt="CARRYHOME" src="/images/brandLogo.jpg" width={162} height={75}/> 
            </Link>       
        </div>
     );
}
export default BrandLogo;
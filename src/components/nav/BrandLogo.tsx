"use client";
import Link from "next/link";
import Image from "next/image";

const BrandLogo = () => {
    return ( 
        <div>     
            <Link href="/">
                <Image alt="CARRYHOME" src="/images/brandLogo.jpg" width={250} height={75}/> 
            </Link>       
        </div>
     );
}
 
export default BrandLogo;
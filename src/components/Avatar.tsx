"use client";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps{
    src?: string | null | undefined
} 

const Avatar:React.FC<AvatarProps> = ({src}) => {

    return ( 
        <div >
            <div>
                {
                    src ? 
                    (<Image src={src} alt="Avatar" className="rounded-full" height={32} width={32}/>)
                    :
                    (<FaUserCircle size={30}/>) 
                }
            </div>
        </div>
     );
}
 
export default Avatar;
"use client";
import Cookies from "js-cookie";
interface ContainerProps {
    children:React.ReactNode;
}

const Container : React.FC<ContainerProps> = ({children}) => {


    return(
        <div className="max-w-[1460px] mx-auto">
            {children}
        </div>
    )
}

export default Container;
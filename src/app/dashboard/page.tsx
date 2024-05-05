"use client";
import SideBar from "../../components/SideBar";

interface InnerLayoutProps {
    children: React.ReactNode;
}

const InnerLayout:React.FC<InnerLayoutProps> = ({children}) => {

    return ( 
        <div>
            <div className="flex w-auto">
                <div>
                    <SideBar/>
                </div>
                <main className="w-full h-[630px] p-5 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
     );
}
 
export default InnerLayout;
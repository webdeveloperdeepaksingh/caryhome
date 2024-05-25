
interface InnerLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout:React.FC<InnerLayoutProps> = ({children}) => {

    return ( 
        <div>
            <div className="flex w-auto">
                <main className="w-full h-[630px] p-5 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
     );
}
 
export default DashboardLayout;
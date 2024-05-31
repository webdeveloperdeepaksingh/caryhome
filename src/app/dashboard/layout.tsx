import SideBar from "@/components/SideBar";

 interface CommonInnerlayoutProps {
    children : React.ReactNode;
}

 
const CommonInnerlayout: React.FC<CommonInnerlayoutProps> = ({children}) => {

    return (
      <div className="relative flex w-auto">
        <div className="hidden max-w-[250px] md:block">
          <SideBar/>
        </div>
        <main className="w-full h-[650px] p-5 overflow-auto">
            {children}
        </main>     
        <div className="absolute bottom-0 w-full md:hidden">
          <SideBar/>
        </div>
       </div>
    )
  }
export default CommonInnerlayout;
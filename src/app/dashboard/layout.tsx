import SideBar from "@/components/SideBar";

 interface CommonInnerlayoutProps {
    children : React.ReactNode;
}

 
const CommonInnerlayout: React.FC<CommonInnerlayoutProps> = ({children}) => {

    return (
      <div className="flex w-auto">
        <div className="max-w-[250px]">
          <SideBar/>
        </div>
        <main className="w-full h-[650px] p-5 overflow-auto">
            {children}
        </main>     
       </div>
    )
  }
export default CommonInnerlayout;
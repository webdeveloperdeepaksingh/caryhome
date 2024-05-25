import SideBar from "@/components/SideBar";
import DashboardLayout from "./page";
interface CommonInnerlayoutProps {
    children : React.ReactNode;
}

const CommonInnerlayout: React.FC<CommonInnerlayoutProps> = ({children}) => {

    return (
      <div className="flex w-auto">
        <div>
          <SideBar/>
        </div>
        <div className="w-full">
          <DashboardLayout>
              {children}
          </DashboardLayout>
        </div>       
       </div>
    )
  }
export default CommonInnerlayout;
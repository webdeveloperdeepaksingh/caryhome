import InnerLayout from "./page";

interface CommonInnerlayoutProps {
    children : React.ReactNode;
}

const CommonInnerlayout: React.FC<CommonInnerlayoutProps> = ({children}) => {

    return (
      <div>
        <InnerLayout>
          {children}
        </InnerLayout>
       </div>
    )
  }
export default CommonInnerlayout;
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import CheckoutForm from "../CheckoutForm";
import { getAccount } from "../../dashboard/account/[UsrId]/page";

interface IAccountParams {
    UsrId?: string;
}

const MainCheckout = async ({params}:{params:IAccountParams}) => {

    const accData = await getAccount(params);
    
    return ( 
        <div>
            <Container>
               <FormWrap>
                    <CheckoutForm accData={accData.accData}/>
               </FormWrap>
            </Container>
        </div>
     );
}
 
export default MainCheckout;
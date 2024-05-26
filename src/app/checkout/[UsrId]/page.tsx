import Container from "@/components/Container";
import { BASE_API_URL } from "../../../../utils/constant";
import FormWrap from "@/components/FormWrap";
import CheckoutForm from "../CheckoutForm";


interface IAccountParams {
    UsrId?: string;
}

async function getAccount(id: IAccountParams) {
    
try 
    {
        const res = await fetch(`${BASE_API_URL}/api/account/${id.UsrId}`, {
        cache: "no-store",
        });
        if (!res.ok) {
        throw new Error("Failed to fetch data");
        }
        const adminAcc = await res.json();
        return adminAcc;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

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
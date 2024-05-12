import SignUp from "./SignUp";
import Container from "@/components/Container"; 


const SignUpForm = async () => {

 
    return ( 
        <div>
            <Container>
                <div className="flex mx-auto h-screen items-center justify-center">
                    <SignUp />
                </div>
            </Container>
        </div>
     );
}
 
export default SignUpForm;
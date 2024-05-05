"use client";
import SignUp from "./SignUp";
import getUserById from "../../../actions/getUserById";
import Container from "@/components/Container"; 



const SignUpForm = async () => {

    const loggedInUserId = await getUserById();

    return ( 
        <div>
            <Container>
                <div className="flex mx-auto h-screen items-center justify-center">
                    <SignUp loggedInUserId={loggedInUserId}/>
                </div>
            </Container>
        </div>
     );
}
 
export default SignUpForm;
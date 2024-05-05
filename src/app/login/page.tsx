"use client";
import Container from "@/components/Container";
import getUserById from "../../../actions/getUserById";
import LoginForm from "./LoginForm";

const LoginPage =  () => {

    const loggedInUserId =  getUserById();
    
    return ( 
        <div>
            <Container>
                <div className="flex mx-auto h-screen items-center justify-center">
                    <LoginForm loggedInUserId={loggedInUserId}/>
                </div>
            </Container>
        </div>
     );
}
 
export default LoginPage;
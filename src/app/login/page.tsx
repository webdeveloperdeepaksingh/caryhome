"use client";
import Container from "@/components/Container";
import LoginForm from "./LoginForm";

const LoginPage =  () => {

    
    return ( 
        <div>
            <Container>
                <div className="flex mx-auto h-screen items-center justify-center">
                    <LoginForm />
                </div>
            </Container>
        </div>
     );
}
 
export default LoginPage;
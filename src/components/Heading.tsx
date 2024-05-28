"use client";
import Container from "./Container";
interface HeadingProps{
    title: string
 }

const Heading : React.FC<HeadingProps> = ({title}) => {
    return ( 
        <div>
            <Container>
                <div className="w-full border-t-[1.5px] border-y-[1.5px] p-3 text-center">
                    <h1 className="font-bold text-3xl uppercase">
                        {title}
                    </h1>
                </div>
            </Container>
        </div>
     );
}
 
export default Heading;
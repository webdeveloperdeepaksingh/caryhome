"use client";
import Image from "next/image";
import Container from "./Container";

const HomeBanner = () => {
    return ( 
        <div>
            <Container>
                <div className="p-6 md:p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 p-9  md:p-24 w-full my-6 bg-indigo-800 items-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-6xl text-white font-bold">Bumper </h1>
                            <h1 className="text-6xl text-white font-bold">Diwali Dhamaka...!</h1>
                            <p className="text-yellow-300 text-xl">Heavy discount on each selected items.</p>
                            <p className="text-yellow-300 font-bold text-xl uppercase">Enjoy 70% off.</p>
                        </div>
                        <div className="mx-auto">
                            <Image alt="items" src="/images/elctro.jpg" width={600} height={350}/>
                        </div>
                    </div> 
                </div> 
            </Container>
        </div>
     );
}
 
export default HomeBanner;
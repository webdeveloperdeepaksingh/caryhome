"use client";
import Container from "../../Container";
import CartIcon from "./CartIcon";
import BrandLogo from "./BrandLogo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
 
const NavBar =  () => {

     
    return ( 
        <div className='sticky top-0 w-full bg-white z-30 shadow-lg h-auto p-4'>          
            <Container>
                <div className='flex items-center justify-between'>
                    <div>
                        <BrandLogo/>
                    </div>
                    <div>
                        <SearchBar/>
                    </div>                                              
                    <div className="flex items-center gap-3" >
                        <CartIcon/>
                        <UserMenu  />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default NavBar;
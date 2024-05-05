import Container from "../Container";
import BrandLogo from "./BrandLogo";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";


const NavBar = async () => {

    // const loggedInUserId = await getUserById();
    
    return ( 
        <div className='sticky top-0 w-full bg-white z-30 shadow-lg h-auto'>
            <div className="p-4">
                <Container>
                    <div className='flex items-center justify-between'>
                        <BrandLogo/>
                        <SearchBar/>
                        <div className="flex items-center gap-3">
                            <CartIcon/>
                            {/* <UserMenu  loggedInUserId={loggedInUserId}/> */}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
     );
}
 
export default NavBar;
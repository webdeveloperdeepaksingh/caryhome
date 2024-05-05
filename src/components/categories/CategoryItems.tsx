import { CategoryList } from "./CategoryList";
import Container from "../Container";

const CategoryItems = () => {

    return ( 
        <div>
            <Container>
                <div className="grid grid-cols-3  md:grid-cols-5 lg:grid-cols-10 p-4 gap-6 border-t-[1.5px] border-y-[1.5px] my-4">
                    {
                        CategoryList.map((item)=>{
                            return (
                                <div key={item.label} className="w-[120px] h-[70px] p-3 shadow-lg rounded-md bg-indigo-800 cursor-pointer">
                                    <div className="flex flex-col">
                                        <div className="text-white">
                                            {item.icon}
                                        </div>
                                        <div className="text-white">
                                            {item.label}
                                        </div>
                                    </div> 
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryItems;
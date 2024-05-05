import Container from "../Container";
import ProductCard from "./ProductCard";
import { getProducts } from "@/app/dashboard/products/page";


const Products = async () => {

    const data = await getProducts();
    
    return ( 
        <div className="my-9">
            <Container>
                <ProductCard data={data.prodList}/>
            </Container>
        </div>
     );
}
 
export default Products;
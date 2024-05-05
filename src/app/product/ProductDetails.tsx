"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import Container from "@/components/Container";
import { Rating } from "@mui/material";
import ProductImage from "../../components/ProductImage";
import SetQuantity from "@/components/ProductQty";
import SetColor from "../../components/SetColor";
 
interface ProductDetailsProps {
    prodById:any;
}



const ProductDetails:React.FC<ProductDetailsProps> = ({prodById}) => {


    const dispatch = useDispatch();
    const handleAddToCart = (product:any) =>{
        dispatch(addToCart(product)); 
    }

    const prodRating = prodById.prodReviews.reduce((acc:number, item:any) => 
        item.rating + acc , 0)/ 
        prodById.prodReviews.length;


    return ( 
        <div>
           <Container>
                <div className="grid grid-cols-2 h-auto mt-8">
                    <div className="">
                        <ProductImage prodById={prodById}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col border-b-2 gap-3 py-3">
                            <h1 className="text-3xl font-bold">{prodById.prodName}</h1>
                            <div className="flex items-center gap-2">
                                <Rating value={prodRating} readOnly/>
                                <div className="text-sm">{prodById.prodReviews.length} reviews</div>
                            </div>
                        </div>
                        <div className="pb-3 border-b-2">
                            <p className="text-justify">{prodById.prodDesc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h6 className="text-md font-semibold">CATEGORY:</h6>
                            <p>{prodById.prodCat}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h6 className="text-md font-semibold">BRAND:</h6>
                            <p>{prodById.prodBrand}</p>
                        </div>
                        <div className={`${prodById.inStock ? "text-green-600 text-sm font-semibold" : "text-red-600 text-sm font-semibold"}`}>
                            {
                                prodById.inStock ? "In Stock" : "Out of Stock"
                                
                            }
                        </div>
                        <SetColor prodById={prodById}/>
                        <SetQuantity />
                        <button type="button" className="btnLeft" onClick={()=>handleAddToCart(prodById)}>
                            Add to cart
                        </button>
                    </div>
                </div>
           </Container>
        </div>
     );
}
 
export default ProductDetails;
import { timeStamp } from 'console';
import mongoose, { Document, Model } from 'mongoose';
  
interface ProductProps extends Document {
    prodName: string;
    prodSlug?: string;
    prodTags?: string[];
    prodCat: string;
    prodDesc?: string;
    prodPrice: number;
    prodBrand: string;
    prodColor: string[];
    prodReviews?: Array<typeof prodReviewsSchema> | [];
    inStock: boolean;
    prodImage?: string[] | []; 
}

const prodReviewsSchema = new mongoose.Schema({
    userId: String,
    usrName: String,
    rating: Number,
    comment: String,
},{timestamps:true});
  
const productSchema = new mongoose.Schema<ProductProps>({
prodName: {
    type: String,
    required: true,
},
prodSlug: {
    type: String,
    required: false,
},
prodTags: [String],
prodCat: {
    type: String,
    required: true,
},
prodDesc: {
    type: String,
    required: false,
},
prodPrice: {
    type: Number,
    required: true,
},
prodBrand: {
    type: String,
    required: true,
},
prodReviews: [prodReviewsSchema],
inStock: {
    type: Boolean,
    required: true,
},
prodColor: [String],
prodImage: [String]
}, { timestamps: true });

const Products: Model<ProductProps> = mongoose.models.Products || mongoose.model<ProductProps>('Products', productSchema);
export default Products;
  

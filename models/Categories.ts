import mongoose, { Document, Model } from 'mongoose';

interface CategoryProps extends Document {
    catName: string;
    catImage?: string;
}

const categorySchema = new mongoose.Schema<CategoryProps>({
    catName: {
        type: String,
        required: true,
    },
    catImage: {
        type: String,
        required: false,
    },
},{timestamps: true});

const Categories: Model<CategoryProps> = mongoose.models.Categories || mongoose.model<CategoryProps>('Categories', categorySchema);

export default Categories;

import { NextResponse, NextRequest } from "next/server";
import Products from "../../../../models/Products";
import dbConnect from "../../../../dbConnect";

type ProductType = {
    prodName: string;
    prodSlug?: string | null;
    prodTags?: any;
    prodCat: string;
    prodDesc?: any;
    prodPrice: number;
    prodBrand: string;
    prodColor:string[];
    prodReviews?: string[] | null;
    inStock:boolean;
    prodImage?: string[] | null;
}

export async function GET(req:NextRequest){

  try {
    await dbConnect();
    const prodList:ProductType[] = await Products.find();
    return NextResponse.json({ prodList, success: true }, {status:200});
  } catch (error) {
    return new NextResponse("Error while fetching prodData: " + error, {status:500});
  }
}

export async function POST(req: NextRequest) {

    try {
  
      await dbConnect();
      const { prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage }: ProductType = await req.json();
  
      const newProduct = new Products({ prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage });
      const savedProduct = await newProduct.save();
  
      return NextResponse.json({ savedProduct, success: true }, {status:200});
  
    } catch (error) {
      if (error instanceof Error) {
        // TypeScript now knows 'error' is an Error instance
        return NextResponse.json({ success: false, message: error.message }, {status:400});
      } else {
        return new NextResponse("Error while saving prodData: " + error);
      }
    }
  }
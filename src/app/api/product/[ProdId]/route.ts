import { NextRequest, NextResponse } from "next/server";
import Products from "../../../../../models/Products";
import dbConnect from "../../../../../dbConnect";

type ReqProductData =  {
    _id?: string,
    prodName: string;
    prodSlug?: string;
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

interface IProdParams{
    ProdId?: string;
}

export async function GET(req:NextRequest, {params}:{params:IProdParams}){

  try 
    {
      await dbConnect();
      const productById  = await Products.findById(params.ProdId);

      if(!productById){
        return NextResponse.json({ message: "No product found with the given id." }, { status: 404 });
      }
      return NextResponse.json({ productById, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching catData: " + error, {status:500});
    }
  }

export async function PUT(req: NextRequest, {params}:{params:IProdParams}) {

  try 
  {
    await dbConnect();
    
    const { prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage }: ReqProductData = await req.json();
    const productById = await Products.findByIdAndUpdate(params.ProdId, {prodName, prodSlug, prodTags, prodCat, prodDesc, prodPrice, prodBrand, prodReviews, prodColor, inStock, prodImage}, {runValidators:true});

    if(!productById){
      return NextResponse.json({ message: "No product found with the given id." }, { status: 404 });
    }
  
    return NextResponse.json({ productById, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}

export async function DELETE(req: NextRequest, {params}:{params:IProdParams}):Promise<NextResponse> {

  try 
  {
    await dbConnect();
    const prodToDelete = await Products.findByIdAndDelete(params.ProdId);

    if(!prodToDelete){
      return NextResponse.json({ message: "No category found with the given id." }, { status: 404 });
    }

    return NextResponse.json({ prodToDelete, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}
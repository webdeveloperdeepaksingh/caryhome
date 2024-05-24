import { NextRequest, NextResponse } from "next/server";
import Products from "../../../../../models/Products";
import dbConnect from "../../../../../dbConnect";
import Accounts from "../../../../../models/Accounts";

interface IProdParams{
    ProdId?: string;
}

type Review = {
    userId: String,
    usrName:String,
    rating: Number,
    comment: String,
}

export async function PUT(req: NextRequest, {params}:{params:IProdParams}) {

    try 
    {
      await dbConnect();
      
      const { rating, comment, userId }: Review = await req.json();
      const user=await Accounts.findById(userId);
      let product: any = await Products.findById(params.ProdId);      
  
      if(!product){
        return NextResponse.json({ message: "No product found with the given id." }, { status: 404 });
      }      

      if(!product.prodReviews){
        product.prodReviews=[];
      }
      
      product.prodReviews.push({
        userId: userId,
        usrName: user.usrName,
        rating: rating,
        comment: comment,
      });
      
      const productById = await Products.findByIdAndUpdate(params.ProdId, product);
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
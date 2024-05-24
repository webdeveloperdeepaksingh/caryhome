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

export const GET = async (request:NextRequest) => {
  
    try
    {  
        const url = new URL(request.url);
        const query = url.searchParams.get('query');
      
        await dbConnect ();
        let prodList: ProductType[] = await  Products.find(); 
  
        if (query) {
            let prodListByQuery = prodList.filter((item: any) => item.prodName.toLowerCase().includes(query.toLowerCase()));
            return new NextResponse(JSON.stringify(prodListByQuery), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify(prodList), { status: 200 });
        }       
  
    }catch(error:any){
      return new NextResponse ("Error while fetching data: " + error, {status: 500});
    }
};
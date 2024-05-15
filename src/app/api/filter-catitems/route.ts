import { NextResponse, NextRequest } from "next/server";
import Products from "../../../../models/Products";
import dbConnect from "../../../../dbConnect";

export const GET = async (request:NextRequest) => {
  
    try{  
  
        const url = new URL(request.url);
        const query = url.searchParams.get('query');
        const prod = url.searchParams.get('prod');
      
        await dbConnect ();
        let prodList = await  Products.find(); 
  
        if(query && query !== "All"){
            if(prod){
                let catItemList = prodList.filter((item:any) => item.prodCat === query && item.prodName.toLowerCase().includes(prod.toLowerCase()));
                return new NextResponse (JSON.stringify(catItemList), {status: 200});
            }
            else{
                let catItemList = prodList.filter((item:any) => item.prodCat === query);
                return new NextResponse (JSON.stringify(catItemList), {status: 200});
            }
        }else{
            if(prod){
                let catItemList = prodList.filter((item:any) => item.prodName.toLowerCase().includes(prod.toLowerCase()));
                return new NextResponse (JSON.stringify(catItemList), {status: 200});
            }
            else{
                return new NextResponse (JSON.stringify(prodList), {status: 200});
            }
        }       
  
    }catch(error:any){
      return new NextResponse ("Error while fetching data: " + error, {status: 500});
    }
  };
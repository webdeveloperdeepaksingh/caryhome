import { NextResponse, NextRequest } from "next/server";
import Orders from "../../../../models/Order";
import dbConnect from "../../../../dbConnect";

type OrderType = {
    usrId: string;
    orderAmount: string;
    usrProducts:ProductType[];
    razorpay_order_id:string;
    razorpay_payment_id:string;  
}

type ProductType = {
    prodId:string;
    prodName:string;
    prodPrice:number;
    prodCat:string;
    prodBrand:string;
    prodQty:number;
    prodColor:string;
    prodTotalPrice:number;
}

export const GET = async (request:NextRequest) => {
  
    try
    {  
        const url = new URL(request.url);
        const query = url.searchParams.get('query');``
      
        await dbConnect ();
        let orderList: OrderType[] = await  Orders.find(); 
  
        if (query) {
            let orderListByQuery = orderList.filter((item: any) => item.razorpay_order_id.toLowerCase().includes(query.toLowerCase()) || item.razorpay_payment_id.toLowerCase().includes(query.toLowerCase()));
            return new NextResponse(JSON.stringify(orderListByQuery), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify(orderList), { status: 200 });
        }       
  
    }catch(error:any){
      return new NextResponse ("Error while fetching data: " + error, {status: 500});
    }
};
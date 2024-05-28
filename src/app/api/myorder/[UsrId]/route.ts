import { NextResponse, NextRequest } from "next/server";
import Orders from "../../../../../models/Order";
import dbConnect from "../../../../../dbConnect";

interface OrderType {
    usrId: string,
    usrProducts:string[],
    razorpay_order_id: string,
    razorpay_payment_id: string,
    orderAmount:string
}

interface IUserParams {
    UsrId?:string;
}

export async function GET(req:NextRequest, {params}:{params:IUserParams}){
try 
  {

    await dbConnect();
    const orderList:OrderType[] = await Orders.find();
    const orderByUserId = orderList.filter((item)=> item.usrId === params.UsrId);
    return NextResponse.json({ orderByUserId, success: true }, {status:200});

  } catch (error) {
    return new NextResponse("Error while fetching orderData: " + error, {status:500});
  }
}
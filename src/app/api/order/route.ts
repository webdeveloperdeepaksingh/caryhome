import { NextRequest, NextResponse } from "next/server";
import Orders from "../../../../models/Order";
import dbConnect from "../../../../dbConnect";

interface OrderType  {
    usrId: string,
    usrProducts:string[],
    razorpay_order_id: string,
    razorpay_payment_id: string,
    orderAmount:string
}

export async function GET(req:NextRequest){

try 
    {

        await dbConnect();
        const orderList:OrderType[] = await Orders.find();
        return NextResponse.json({ orderList, success: true }, {status:200});

    } catch (error) {
        return new NextResponse("Error while fetching catData: " + error, {status:500});
    }
}
import { NextRequest, NextResponse } from "next/server";
import Orders from "../../../../models/Order";
import dbConnect from "../../../../dbConnect";

export type OrderType = {
    usrId: string,
    usrProducts:string[],
    razorpay_order_id: string,
    razorpay_payment_id: string,
    orderAmount:string,
    createdAt:Date,
}

export async function GET(req: NextRequest) {
try 
    {
      await dbConnect();
      const orderList: OrderType[] = await Orders.find();
      const filteredOrders = orderList.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const currentMonth = new Date().getMonth();
        return orderDate.getMonth() === currentMonth;
      });
  
      return NextResponse.json({ orderList: filteredOrders, success: true }, { status: 200 });
    } catch (error) {
      return new NextResponse("Error while fetching orderData: " + error, { status: 500 });
    }
  }
  


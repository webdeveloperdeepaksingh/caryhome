import { NextRequest, NextResponse } from "next/server";
import Orders from "../../../../models/Order";
import dbConnect from "../../../../dbConnect";

export type OrderType = {
    orderAmount: string,
    createdAt: Date,
}

export async function GET(req: NextRequest) {
try 
    {
        await dbConnect();
        const orderList: OrderType[] = await Orders.find();

        const today = new Date();
        const sevenDaysAgo = new Date(today.getDate() - 7);

        const filteredOrders = orderList.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= sevenDaysAgo;
        });

        return NextResponse.json({ orderList: filteredOrders, success: true }, { status: 200 });
    } catch (error:any) {
        return new NextResponse("Error while fetching orderData: " + error, { status: 500 });
    }
}

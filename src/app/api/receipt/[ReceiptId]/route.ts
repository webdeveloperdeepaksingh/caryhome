import { NextResponse, NextRequest } from "next/server";
import Orders from "../../../../../models/Order";
import dbConnect from "../../../../../dbConnect";

type UserType = {
    _id?:string;
    usrName: string;
    usrPhone: string;
    usrAddress: string;
}

interface IPaymentParams{
    ReceiptId?: string;
}

export async function GET(req:NextRequest, {params}:{params:IPaymentParams}){

try 
    {
  
      await dbConnect();
      const pymtData = await Orders.findById(params.ReceiptId);

      if(!pymtData){
        return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
      }
      return NextResponse.json({ pymtData, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching pymtData: " + error, {status:500});
    }
}




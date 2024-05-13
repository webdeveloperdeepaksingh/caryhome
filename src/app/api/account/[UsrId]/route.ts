import { NextResponse, NextRequest } from "next/server";
import Accounts from "../../../../../models/Accounts";
import dbConnect from "../../../../../dbConnect";

type reqData = {
    usrName:string,
    usrEmail:string,
    usrImage: string,
    usrAddress: string,
    usrRole:string | null,
    usrPhone: string | null,
}

interface IUserParams{
    UsrId?: string;
}

export async function GET(req:NextRequest, {params}:{params:IUserParams}){

  try 
    {
  
      await dbConnect();
      const accData = await Accounts.findById(params.UsrId);

      if(!accData){
        return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
      }
      return NextResponse.json({ accData, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching accData: " + error, {status:500});
    }
  }

export async function PUT(req: NextRequest, {params}:{params:IUserParams}) {

  try 
  {
    await dbConnect();
    
    const { usrName, usrEmail, usrRole, usrPhone, usrImage, usrAddress }: reqData = await req.json();
    const accData = await Accounts.findByIdAndUpdate(params.UsrId, {usrName, usrEmail, usrRole, usrPhone, usrImage, usrAddress}, {runValidators:true});

    if(!accData){
      return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
    }
  
    return NextResponse.json({ accData, success: true }, {status:200});

  } catch (error) {
    if (error instanceof Error) {
       return NextResponse.json({ success: false, message: error.message }, {status:400});
    } else {
      return new NextResponse("Error while updating catData: " + error);
    }
  }
}
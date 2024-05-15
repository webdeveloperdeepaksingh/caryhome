import { NextResponse, NextRequest } from "next/server";
import Accounts from "../../../../../models/Accounts";
import dbConnect from "../../../../../dbConnect";

type reqData = {
    usrImage:string | null,
    usrAddress: string | null,
}

interface IUserParams{
    UsrId?: string;
}

export async function GET(req:NextRequest, {params}:{params:IUserParams}){

    try 
    {
  
      await dbConnect();
      const profileData = await Accounts.findById(params.UsrId);

      if(!profileData){
        return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
      }
      return NextResponse.json({ profileData, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching accData: " + error, {status:500});
    }
  }

export async function PUT(req: NextRequest, {params}:{params:IUserParams}) {

  try 
  {
    await dbConnect();
    
    const { usrImage, usrAddress }: reqData = await req.json();
    const profileData = await Accounts.findByIdAndUpdate(params.UsrId, {usrImage, usrAddress}, {runValidators:true});

    if(!profileData){
      return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
    }
  
    return NextResponse.json({ profileData, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}
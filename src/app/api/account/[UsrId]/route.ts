import { NextResponse, NextRequest } from "next/server";
import Accounts from "../../../../../models/Accounts";
import dbConnect from "../../../../../dbConnect";
import bcrypt from "bcryptjs";

type reqData = {
    usrName:string,
    usrEmail:string,
    usrImage: string,
    usrPass:string,
    confPass:string,
    newPass:string,
    usrAddress: string,
    usrRole:string | null,
    usrPhone: string | null,
    isPasswordChangeRequest: boolean
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
    
    const { usrName, usrEmail, usrRole, usrPhone, usrPass, newPass, confPass, usrImage, usrAddress, isPasswordChangeRequest }: reqData = await req.json();
    let account = await Accounts.findById(params.UsrId);

    if(!account){
      return NextResponse.json({ message: "No account found with the given id." }, { status: 404 });
    } 

    if(isPasswordChangeRequest === true){

      if(!(await bcrypt.compare(usrPass, account.usrPass))){
        return NextResponse.json({ success: false,  msg: 'Invalid old password!' }, {status:400});
      }else{
        if (!(newPass === confPass)) {
          return NextResponse.json({ success: false,  msg: "Password & Confirm password does not match." }, { status: 400 });
        }else{
          account.usrPass = newPass;   
          const passSaved = await account.save();
          return NextResponse.json({result:passSaved, msg:"Password changed successfully.", success:true}, {status:200});
        }
      } 
    }else {
      const accData = await Accounts.findByIdAndUpdate(params.UsrId, {usrName, usrEmail, usrRole, usrPhone, usrImage, usrAddress}, {runValidators:true});
      return NextResponse.json({ accData, success: true }, {status:200});
    }
  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}

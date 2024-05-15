import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../dbConnect";
import Accounts from "../../../../models/Accounts";


export const POST = async (request: NextRequest) => {

  try 
  {
    const { usrName, usrEmail, usrPass, confPass } = await request.json();

    if (!(usrPass === confPass)) {
      return NextResponse.json({ success: false,  msg: "Password & Confirm password does not match." }, { status: 400 });
    }

    await dbConnect();

    const isAccountExists = await Accounts.findOne({ usrEmail });

    if (isAccountExists) {
      return NextResponse.json({ success: false,  msg: "User already exists." }, { status: 400 });
    }
    
    const newAccount = new Accounts({usrName, usrEmail, usrPass});
    await newAccount.save();
    return NextResponse.json({ msg: "Registered Successfully." },{ status: 200 });

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
};

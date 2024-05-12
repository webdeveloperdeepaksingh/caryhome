import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../dbConnect";
import Accounts from "../../../../models/Accounts";
import bcrypt from "bcryptjs";

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
    
    const password_hash = await bcrypt.hash(usrPass, 12);
    const newAccount = new Accounts({usrName, usrEmail, usrPass: password_hash});

    await newAccount.save();
    return NextResponse.json({ msg: "Registered Successfully." },{ status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ success: false, message: error.message }, {status:400});
    } else {
        return new NextResponse("Error while saving accData: " + error);
    }
  }
};

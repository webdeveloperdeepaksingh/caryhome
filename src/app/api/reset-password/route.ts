import { NextResponse, NextRequest } from "next/server";
import Accounts from "../../../../models/Accounts";
import dbConnect from "../../../../dbConnect";
import crypto from 'crypto-browserify';

export const PUT = async (request:NextRequest) =>{

try 
    {
        const {token, usrPass, confPass} = await request.json();

        await dbConnect();
        const resetLink = crypto.createHash('sha256').update(token).digest('hex');
        const user = await Accounts.findOne({pwdResetToken:resetLink, pwdResetTokenExpires: {$gt: Date.now()}});

        //If the user exists with the given resetLink and the link has not expired.
        if(!user){
            return NextResponse.json({ success: false, msg: 'The reset link is invalid or has expired...!' }, {status:400}); 
        }else{
            if (!(usrPass === confPass)) {
                return NextResponse.json({ success: false,  msg: "Password & Confirm password does not match." }, { status: 400 });
            }else{
                user.usrPass = usrPass;
                user.pwdResetToken = undefined;
                user.pwdResetTokenExpires = undefined;
                await user.save({runValidators: true}); 
                return NextResponse.json({ success: true, msg: 'Password reset successfully.' }, {status:200}); 
            }
        }
    } catch(error:any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val:any) => val.message);
            return NextResponse.json({ success: false, msg: messages }, {status:400});
        }else{
            return new NextResponse ("Error while posting data: " + error, {status: 400});
        }
    }
}
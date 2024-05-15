import { NextResponse, NextRequest } from "next/server";
import Accounts from "../../../../models/Accounts";
import dbConnect from "../../../../dbConnect";
import sendEmail from "../../../../utils/email";
import crypto from 'crypto-browserify';

 
export const PUT = async (request:NextRequest) => {

    try {
        const {usrEmail} = await request.json();
        await dbConnect();

        const user = await Accounts.findOne({usrEmail});

        if(!user){
            return NextResponse.json({ success: false, msg: 'No user found!' }, {status:404});
        }else{
            const filter = {_id:user._id};
            const resetToken = crypto.randomBytes(32).toString('hex'); //creating random token
            const pwdResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); //hashing token in hexa-decimal
            const pwdResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); //creating expiring time for resetToken
    
            const tokenData = await Accounts.findByIdAndUpdate(filter, {pwdResetToken, pwdResetTokenExpires}, {runValidators: false});
            const resetUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/reset-password/${resetToken}`;  //creating a resetUrl to be sent to user.
            const message = `We have received a password reset request. Please use the below link to reset your password:<br><br><a href="${resetUrl}">${resetUrl}</a><br><br>This reset link will be valid only for 10 minutes.`;

            try 
            {
                await sendEmail({ email: user.usrEmail, subject: 'Password reset request received.', message: message});
                return NextResponse.json({ success: true, msg: 'Password reset lint sent to your email.', resetToken:resetToken, tokenData:tokenData }, {status:200});

            } catch (error) {
                user.pwdResetToken = undefined;
                user.pwdResetTokenExpires = undefined;
                user.save({runValidators: false});
                return NextResponse.json({ success: false, msg: 'Error sending reset link...! Please try again later.' }, {status:500});
            }
        }

    } catch (error:any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val:any) => val.message);
            return NextResponse.json({ success: false, msg: messages }, {status:400});
          }else{
            return new NextResponse ("Error while posting data: " + error, {status: 400});
        }
    }
}
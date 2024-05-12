import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../dbConnect";
import Accounts from "../../../../models/Accounts";

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const POST = async (request: NextRequest, response: NextResponse) => {

    try 
    {
        const { usrName, usrPass } = await request.json();
        await dbConnect();
        
        const user = await Accounts.findOne({ $or: [{ usrName }, { usrEmail: usrName }] });
        if (!user || !(await bcrypt.compare(usrPass, user.usrPass))) {
            return NextResponse.json({ success: false, token: '', message: 'Invalid user or password!' }, { status: 400 });
        }

        const secretKey: string = process.env.SECRET_STR || ''; 
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: process.env.LOGIN_EXPIRES });
        user.usrPass = null; // Prevent password from being sent in the response.
        
        return NextResponse.json({ result: { id: user._id, role: user.usrRole, userToken: token, success: true } }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, {status:400});
        } else {
            return new NextResponse("Error while saving accData: " + error);
        }
    }
};

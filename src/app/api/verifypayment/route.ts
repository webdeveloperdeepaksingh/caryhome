import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Orders from "../../../../models/Order";
import dbConnect from "../../../../dbConnect";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

export async function POST(req:NextRequest) {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, usrId, usrProducts, orderAmount } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==",body)

    if (process.env.RAZORPAY_SECRET_KEY) {
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
          .update(body.toString())
          .digest("hex");

          const isAuthentic = expectedSignature === razorpay_signature;

          if (isAuthentic) {
      
              await dbConnect()
              await Orders.create(
                {
                  razorpay_order_id, 
                  razorpay_payment_id, 
                  razorpay_signature,
                  usrId,
                  usrProducts,
                  orderAmount 
                });
          //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));
          } else {
              return NextResponse.json({msg: "fail"}, {status: 400});
          }
      } else {
        // Handle the case where the secret key is missing (e.g., throw an error)
        console.error("RAZORPAY_SECRET_KEY environment variable is not set");
      }   
    return NextResponse.json({ msg: "success"}, {status: 200});
}

import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import Orders from "../../../../models/Order";
import { CartItemType } from "@/app/product/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10"
});

export async function POST(request:NextRequest) {

const body = await request.json();
const { items, payment_intent_id } = body;
const total = items.totalPrice * 100;

try 
{
    if (payment_intent_id) {
        const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total});
        const existingOrder = await Orders.findOne({ paymentIntentId: payment_intent_id });

        if (!existingOrder) {
            return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 });
        }
        return NextResponse.json({ paymentIntent: updatedIntent });
        
    } else {
        const paymentIntent = await stripe.paymentIntents.create({ amount: total, currency: 'INR', automatic_payment_methods: { enabled: true }});
        const orderData = { paymentId: paymentIntent.id, paymentStatus:"pending", orderStatus:"In process", orderAmount: total, usrProduct: items.items, usrId:"663a49d2bf597e300e29571c", usrName:"dilipsmu@gmail.com" };    
        await Orders.create(orderData);
        return NextResponse.json({ paymentIntent });
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



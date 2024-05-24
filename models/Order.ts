import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    prodId: String,
    prodName: String,
    prodPrice: Number,
    prodCat:  String,
    prodBrand: String,
    prodQty: Number,
    prodColor: String,
    prodTotalPrice: Number
},{timestamps:true});

const orderSchema = new mongoose.Schema({
    usrId: {
        type: String,
        required: true,
    },
    usrProducts: [prodSchema],
    paymentStatus: {
        type: String
    },
    deliveryStatus: {
        type: String
    },
    orderStatus:{
        type:String
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    }, 
    orderAmount:{
        type:String
    }
},{timestamps: true});

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default Orders;

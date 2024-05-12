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
    usrName: {
        type: String,
        required: true,
    },
    usrId: {
        type: String,
        required: true,
    },
    usrProduct: [prodSchema],
    paymentStatus: {
        type: String
    },
    deliveryStatus: {
        type: String
    },
    orderStatus:{
        type:String
    },
    paymentId:{
        type: String
    },
    orderId:{
        type:String
    },
    orderAmount:{
        type:String
    }
},{timestamps: true});

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default Orders;

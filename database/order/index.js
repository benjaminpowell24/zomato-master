import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "Users"},
    orderDetails: [{
        food: {type: mongoose.Types.ObjectId, ref: "Foods", required:true},
        quantity: {type: Number, required:true},
        paymentMode: {type: String, required: true},
        status: {type: String, default: "Placed"},
        paymentDetails: {
            orderTotal: {type: Number, required:true},
            promo: {type: Number},
            tax: {type: Number, required:true}
        }
    }],
    orderRatings: {type: Number}
},{
    timestamps: true
});

export const OrderModel = mongoose.model("Orders", OrderSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    cartItems:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItems",
        // required:true
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalItem:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
        default:0
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },
})

export const Cart = mongoose.model("cart",cartSchema)







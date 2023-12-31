import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

// const userSchema = new Schema({
//     firstName:String,
//     lastName:String,
//     email:String,
//     password:String,
//     mobile:Number,
//     active:Boolean
// });

// ---------------------------------

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is mandate"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is mandate"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is mandate"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is mandate"],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "password is mandate"],
    },
    role:{
      type:String,
      required:true,
      default:"Customer"
    },
    mobile:{
      type:String,
    },
    address:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"addresses"
    }],
    paymentInformation:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"payment_information"
    }],
    ratings:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ratings"
    }],
    reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"reviews"
    }]
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("users", userSchema);

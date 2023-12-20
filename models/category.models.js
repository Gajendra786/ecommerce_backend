import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
name:{
    type:String,
    required: true,
    maxlength:50
},
parentCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
},
level:{
    type:Number,
    required: true,
}
})

export const Category = mongoose.model("categories",categorySchema)
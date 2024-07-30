import mongoose from "mongoose";
// import { Schema, model } from "mongoose";
const book=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
        title:{
             type:String,
             required:true,
        },
        author:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        language:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
);
export const Book=mongoose.model("Book",book);
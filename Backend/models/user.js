import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        default:"https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg",
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['user','admin'],
    },
    favourite:[{
        type:mongoose.Types.ObjectId,
        ref:"Book",
    },
    ],
    cart:[
        {
         type:mongoose.Types.ObjectId,
         ref:"Book",
        },
    ],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"Order",
    },
    ],       
}, 
{
    timestamps:true
});
export const User =mongoose.model("User",userSchema);
import { connect } from "mongoose";
// require('dotenv').config();

// import dotenv from "dotenv";
// dotenv.config({
//     path: "./"
// })
export const connectDB =async()=>{
    try{
        await connect(`${process.env.URI}`);
          console.log("connected to database");
    } catch(error){
        console.log(error);
    }
}
// connectDB();
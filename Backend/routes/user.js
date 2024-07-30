
import { Router } from "express";
import {User} from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import authentication from "./userAuth.js";
const router = Router();
// const jwt= jwt();
//signup
router.post("/sign-up",async (req,res)=>{
    try{
        const{username,email,password,address,role}=req.body;
        
        console.log(username, email, password, address,role);

        if(username.length<4)
        {
            return res.status(400).json({message:"Username length should be greater than 3"});

        }

      
        const existingUsername = await User.findOne({username:username});
        console.log("object")
        if(existingUsername)
        {
            return res.status(500).json({message:"Username already exists"});
        }

        const existingEmail = await User.findOne({email:email});
        if(existingEmail)
        {
            return res.status(500).json({message:"Email already exists"});
        }

        if(password.length<=5)
        {
            return res.status(400).json({message:"Password's length should be greater"})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser= new User({
            username:username,
            email:email,
            password:hashedPassword,
            address:address,
            role:role,
        });
        await newUser.save();
        return res.status(200).json({message:"SignUp Successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
});



router.post("/sign-in",async (req,res)=>{
    try{
        const{username,password}=req.body;

         const existingUser = await User.findOne({username});
        //  console.log("Sdafas");
         if(!existingUser)
         {
            res.status(400).json({message:"Invalid credentials"});
         }

        

        const isPassword= await bcrypt.compare(password, existingUser.password);

        if(!isPassword){
            return res.status(400).json({message:"Invalid credentials"});
            }

            const token=jwt.sign(
                {id:existingUser._id,username:existingUser.username,role:existingUser.role},"bookverse",{expiresIn:"30d"}
            );
            res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
        }

    catch(error){
        
        res.status(500).json({message:"Internal server error"});
    }
});

router.get("/get-user-information",authentication,async(req,res)=>{
    try{
        const id=req.user.id;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
});

router.put("/update-address",authentication,async(req,res)=>{
    try{
        const id = req.user.id;
        const address = req.body.address;
         const updatedAddress=await User.findByIdAndUpdate(
            id,
            {address:address},
            {new:true}
         );
         if(!updatedAddress){
            return res.status(404).json({message:"User not found"});
         }
         return res.status(200).json({message:"Address Updated Successfully"})
        }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

export default router;
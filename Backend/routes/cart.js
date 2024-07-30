import {Router} from "express";
import {User} from "../models/user.js";
import authentication from "./userAuth.js";

const router = Router();
router.put("/add-to-cart", authentication,async(req,res)=>{
    // console.log("fasdfas");
    try{
        const {bookid,id}=req.headers;
        const userData = await User.findById(id);
        // console.log("userData",userData);+
        const isbookincart = userData.cart.includes(bookid);
        console.log(isbookincart);
        if(isbookincart){
            return res.json({
            status: "success",
            message: "Book is already in cart",
        });
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        });
        return res.json({
            status: "success",
            message:"Book added to cart",
        });

    }catch(error)
    {
        console.error(error)
        return res.status(500).json({message:"An error occurred"});
    }
});

router.put("/remove-from-cart/:bookid", authentication,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}= req.headers;
        const userData=await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        });
    
   
    return res.json({
        status: "success",
        message:"Book removed from cart",
    });

    }catch(error)
    {   console.error(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

router.get("/get-user-cart",authentication,async(req,res)=>{
    try{
      const {id}=req.headers;
    //   console.log(id);
      // console.log(id);
      const userData=await User.findById(id).populate("cart");
    //   console.log(userData);
      const cart= userData.cart.reverse();
     
      return res.json({
          status:"Success",
          data:cart,
      });
  
    }catch(error)
    {
        console.error(error);
      return res.status(500).json({message:"An error occured"});
    }
  });
export default router;
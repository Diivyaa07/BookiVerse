import {Router} from "express";
import authentication from "./userAuth.js";
import {Book} from "../models/books.js";
import {Order} from "../models/order.js";
import {User} from "../models/user.js";
const router=Router();

router.post("/place-order",authentication,async(req,res)=>{
    try{
        const {id} = req.headers;
        const {order} = req.body;
        console.log("order: " , order);
        for(const orderData of order)
        {
            const newOrder= new Order({user:id,book:orderData._id});
            const orderDataFromDb= await newOrder.save();
            console.log("newOrder",newOrder);
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDataFromDb._id},
            });

            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id},
            });
        }
        return res.json({
            status:"Success",
            message:"order placed successfully",
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"An error Occurred"});
    }
});

router.get("/get-order-history", authentication, async (req, res) => {
    try {
      const { id } = req.headers;
      console.log("id: ", id);
  
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const userData = await User.findById(id).populate({
        path: "orders",
        populate: { path: "book" },
      });
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("userData: ", userData);
  
      const orderData = userData.orders.reverse();
      console.log(orderData)
      return res.json({
        status: "Success",
        data: orderData,
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  });
  

router.get("/get-all-orders",authentication,async(req,res)=>{
    try{
        const adminId = req.user.id;
        const userData=await Order.find({admin:adminId}).populate({
            path:"book",
        })
        .populate({
            path:"user",
        }).sort({createdAt: -1});
        
        return res.json({
            status:"Success",
            data:userData,
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({message:"An error occurred"});
    }
});


router.put("/update-status/:id",authentication,async(req,res)=>{
    try{
        const{id}= req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Success",
            message:"Status Updated Successfully",
        });
    } catch(error)
    {
        return res.status(500).json({message:"An error Occurred"});
    }
});
export default router;
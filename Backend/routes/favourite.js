import { Router } from "express"; 
import {User} from "../models/user.js";
import {Book} from "../models/books.js";
import authentication from "./userAuth.js";

const router=Router();

router.put("/add-book-to-favourite",authentication,async(req,res)=>{
    try{
        const {bookid, id}=req.headers;
        const userData = await User.findById(id);
        const isBook=userData.favourite.includes(bookid);
        if(isBook)
        {
            return res.status(200).json({message:"Book is already in favourites"});

        }
        await User.findByIdAndUpdate(id,{$push: {favourite: bookid}});
        return res.status(200).json({message:"Book added to favourites"});
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }
});

router.put("/remove-book-from-favourite",authentication,async(req,res)=>{

    try{
        const {bookid, id}=req.headers;
        const userData = await User.findById(id);
        const isBook=userData.favourite.includes(bookid);
        if(isBook)
        {
            await User.findByIdAndUpdate(id, {$pull :{favourite:bookid}});
        }
        return res.status(200).json({message:"Book removed from favourites"});
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }
});

router.get("/get-favourite-book",authentication,async(req,res)=>{
  try{
    const {id}=req.headers;
    // console.log(id);
    const userData=await User.findById(id).populate("favourite");
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
    console.log(userData);
    const favouriteBooks=userData.favourite;
    return res.json({
        status:"Success",
        data:favouriteBooks,
    });

  }catch(error)
  {
    return res.status(500).json({message:"An error occured"});
  }
});
export default router;
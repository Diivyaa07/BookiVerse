import { Router } from "express";
import {User} from "../models/user.js";
import {Book} from "../models/books.js";
import authentication from "./userAuth.js";

const router=Router();

router.post("/add-book",authentication,async(req,res)=>{
  console.log("received request");
  try{
     const id = req.user.id;
     console.log(`${id}`);
     const user=await User.findById(id);
     if(user.role!=="admin")
     {
       return res.status(400).json({message:"You are not permitted"});
     }

     const{url,title,author,price,desc,language}=req.body;
    const book = new Book({
       user:id,
        url,
        title,
        author,
        price,
        desc,
        language,
    });
     await book.save();
      res.status(200).json({message:"Book added Successfully"})
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({message:"internal Server Error"});
  }
});

router.put("/update-book",authentication,async(req,res)=>{
  try{
    const bookid =req.headers['bookid'];
    const updatedbook = await Book.findByIdAndUpdate(bookid,{
      url:req.body.url,
      title:req.body.title,
      author:req.body.author,
      price:req.body.price,
      desc:req.body.desc,
      language:req.body.language,
    });
    return res.status(200).json({message:"book updated successfully"});
  } catch(error){
    return res.status(500).json({message:"An error occurred"});
  }
});

router.delete("/delete-book",authentication,async(req,res)=>{
  try{
    const bookid = req.headers['bookid'];
    const deletebook=await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message:"Book deleted successfully"});
  }
  catch(error){
    
    return res.status(500).json({message:"An error occurred"});
  }
});

router.get("/get-all-books",async(req,res)=>{
  try{
    const books = await Book.find().sort({createdAt:-1});
    return res.json({
      status:"Success",
      data:books,
    });
  }catch(error){
    return res.status(500).json({message:"An error occured"});
  }
});

router.get("/get-recent-books",async(req,res)=>{
  try{
    const books = await Book.find().sort({createdAt:-1}).limit(4);
    return res.json({
      status:"Success",
      data:books,
    });
  }catch(error){
    return res.status(500).json({message:"An error occured"});
  }
});

router.get("/get-book-by-id/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const book= await Book.findById(id);
    return res.json({
      status:"Success",
      data:book
    });
  }catch(error){
    return res.status(500).json({message:"An error occurred"});
  }
});

export default router;
import express from "express";
// const router = express.Router();
import cors from "cors";
import {connectDB} from './connection/conn.js'
import user from "./routes/user.js";
import dotenv from "dotenv";
import Book from "./routes/book.js";
import favourite from "./routes/favourite.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

dotenv.config({
    path: './.env'
});

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1",user);
app.use("/api/v1",Book);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`);
});

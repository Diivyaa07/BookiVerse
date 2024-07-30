import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    book: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out of Delivery", "Delivered", "Canceled"],
    },
}, {
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema);

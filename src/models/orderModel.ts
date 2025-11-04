import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: "pending" },
  status: { type: String, default: "pending" }, // NEW: pending | shipped | cancelled
});

export const Order = mongoose.model("Order", orderSchema);

import { Request, Response } from "express";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { sendLowStockAlert } from "../utils/emailService";

// -------------------------
// Checkout process (no Razorpay, local test mode)
// -------------------------
export const checkoutProcess = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      totalAmount += product.price * (item.qty ?? 0);
    }

    const newOrder = await Order.create({
      products,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    res.json({
      orderId: newOrder._id,
      amount: totalAmount,
      message: "Checkout success (Razorpay skipped for testing)",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
};

// -------------------------
// Payment success (auto-update stock + low-stock alert)
// -------------------------
export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product && item.qty) {
        product.quantity -= item.qty ?? 0;
        await product.save();

        if (product.quantity <= product.lowStockLimit) {
          await sendLowStockAlert(product.name, product.quantity);
        }
      }
    }

    order.paymentStatus = "paid";
    order.status = "confirmed";
    await order.save();

    res.json({ message: "Payment successful & stock updated" });
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ error: "Payment update failed" });
  }
};

// -------------------------
// Cancel order (if pending)
// -------------------------
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "shipped") {
      return res.status(400).json({ message: "Order already shipped, cannot cancel" });
    }
    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    if (order.status === "pending") {
      order.status = "cancelled";
      order.paymentStatus = "refunded";

      for (const item of order.products) {
        const product: any = item.productId;
        product.quantity += item.qty;
        await product.save();
      }

      await order.save();
      return res.json({ message: "Order cancelled successfully and stock restored" });
    } else {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// -------------------------
// Mark order as shipped
// -------------------------
export const markOrderAsShipped = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Cancelled orders cannot be shipped" });
    }

    if (order.status === "shipped") {
      return res.status(400).json({ message: "Order already shipped" });
    }

    order.status = "shipped";
    await order.save();

    res.json({ message: "Order marked as shipped successfully" });
  } catch (error) {
    console.error("Mark shipped error:", error);
    res.status(500).json({ message: "Failed to mark order as shipped" });
  }
};

// -------------------------
// Get all orders
// -------------------------
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// -------------------------
// Get single order by ID
// -------------------------
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

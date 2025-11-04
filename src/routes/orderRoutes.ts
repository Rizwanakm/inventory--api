/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Create a new order (checkout)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     qty:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Checkout successful
 */

/**
 /**
 /**
 * @swagger
 * /api/orders/payment-success:
 *   post:
 *     summary: Mark payment success and update stock
 *     description: Updates order status to paid and reduces stock for all ordered products. Sends email if low stock.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6729121bc7e3a0a12c34b22f
 *     responses:
 *       200:
 *         description: Payment successful and stock updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Payment update failed
 */


/**
 /**
 * @swagger
 * /api/orders/cancel:
 *   post:
 *     summary: Cancel a pending order
 *     description: Cancels an order if it's still pending. Restores product stock and updates payment status to refunded.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6729121bc7e3a0a12c34b22f
 *     responses:
 *       200:
 *         description: Order cancelled successfully and stock restored
 *       400:
 *         description: Order cannot be cancelled (already shipped or cancelled)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */


import express from "express";
import {
  checkoutProcess,
  paymentSuccess,
  cancelOrder,
  getAllOrders,
  markOrderAsShipped
} from "../controllers/orderController";

const router = express.Router();

router.post("/checkout", checkoutProcess);
router.post("/payment-success", paymentSuccess);
router.post("/cancel", cancelOrder);
router.get("/", getAllOrders);          // ✅ change from "/all" to "/" for proper route

router.put("/ship", markOrderAsShipped);

export default router;

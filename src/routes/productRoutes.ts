/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               lowStockLimit:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added successfully
 */

import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";

const router = express.Router();

router.post("/", addProduct);      // POST /api/products
router.get("/", getAllProducts);   // GET  /api/products

export default router;


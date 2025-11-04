import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";

const router = express.Router();

router.post("/", addProduct);      // POST /api/products
router.get("/", getAllProducts);   // GET  /api/products

export default router;


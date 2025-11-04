import { Request, Response } from "express";
import { Product } from "../models/productModel";

// Add product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity, lowStockLimit } = req.body;
    const newProduct = await Product.create({ name, price, quantity, lowStockLimit });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

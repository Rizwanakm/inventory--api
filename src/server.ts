import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(bodyParser.json());

// Swagger setup
setupSwagger(app);

// Routes
app.use("/api/orders", orderRoutes);    // ✅ fixed
app.use("/api/products", productRoutes); // ✅ fine

mongoose.connect("mongodb://localhost:27017/inventoryDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

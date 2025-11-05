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
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// ✅ MongoDB connection — use environment variable in Render
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/inventoryDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Use Render’s PORT (important!)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

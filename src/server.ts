import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import { setupSwagger } from "./config/swagger"; // ✅ Import Swagger setup

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Swagger setup
setupSwagger(app);

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (Swagger: http://localhost:${PORT}/api-docs)`));


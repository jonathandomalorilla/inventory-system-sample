import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js"; // ✅ new order routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);          // Auth: register/login
app.use("/api/products", productRoutes); // Products CRUD
app.use("/api/orders", orderRoutes);     // Orders: place/get orders

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
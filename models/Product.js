import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  minStockLevel: { type: Number, default: 0 },
  unitPrice: { type: Number, required: true },
  supplier: { type: String },
  status: { 
    type: String, 
    enum: ["In Stock", "Low Stock", "Out of Stock"], 
    default: "In Stock" 
  },
  imageUrl: { type: String }, // optional image link
}, { timestamps: true }); // adds createdAt & updatedAt automatically

const Product = mongoose.model("Product", productSchema);

export default Product;
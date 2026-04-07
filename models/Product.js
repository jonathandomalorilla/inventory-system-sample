import mongoose from "mongoose";

/**
 * Product Schema
 * Represents inventory items/products
 * Used for dashboard statistics and inventory tracking
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: 2
  },
  sku: {
    type: String,
    required: [true, "SKU is required"],
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    enum: ["Engine Parts", "Brake System", "Suspension", "Electrical", "Accessories"],
    default: "Accessories"
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: 0,
    default: 0
  },
  minStockLevel: {
    type: Number,
    default: 5
  },
  unitPrice: {
    type: Number,
    required: [true, "Unit price is required"],
    min: 0
  },
  supplier: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock"],
    default: "In Stock"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update status based on quantity
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (this.quantity === 0) {
    this.status = "Out of Stock";
  } else if (this.quantity <= this.minStockLevel) {
    this.status = "Low Stock";
  } else {
    this.status = "In Stock";
  }
  
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;

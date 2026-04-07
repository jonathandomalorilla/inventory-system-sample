import mongoose from "mongoose";

/**
 * Order Schema
 * Represents customer orders
 * Used for dashboard order tracking and sales statistics
 */
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order number is required"],
    unique: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Customer is required"]
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"]
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      unitPrice: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required"],
    min: 0
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Bank Transfer"],
    default: "Cash"
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  shippingDate: {
    type: Date,
    default: null
  },
  deliveryDate: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ""
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

// Update timestamp on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Delivered", "Cancelled"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  paymentMethod: { type: String, enum: ["Cash", "Card", "Online"], default: "Cash" },
  orderDate: { type: Date, default: Date.now },
  shippingDate: { type: Date, default: null },
  deliveryDate: { type: Date, default: null },
  notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
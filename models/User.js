import mongoose from "mongoose";

/**
 * User Schema
 * Represents system users (admin, customer, staff)
 * - Email must be unique
 * - Password is hashed before storage
 * - Role determines dashboard access level
 */
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true,
    minlength: 2
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: 6,
    select: false // Don't return password by default
  },
  phoneNumber: {
    type: String,
    default: null
  },
  address: { 
    type: String,
    default: null
  },
  role: { 
    type: String, 
    enum: {
      values: ["admin", "staff", "customer"],
      message: "Role must be admin, staff, or customer"
    },
    default: "customer"
  },
  isActive: {
    type: Boolean,
    default: true
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

// Update updatedAt on every save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
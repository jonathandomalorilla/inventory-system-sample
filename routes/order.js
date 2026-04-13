import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
  placeOrder
} from "../controllers/orderController.js";
const router = express.Router();

/**
 * Admin / Staff routes (CRUD)
 */
router.get("/", getAllOrders);         // GET all orders
router.get("/:id", getOrderById);      // GET single order by ID
router.post("/", createOrder);         // POST create new order
router.put("/:id", updateOrder);       // PUT update order
router.delete("/:id", deleteOrder);    // DELETE order

/**
 * Customer routes (require auth)
 * Note: verifyUser middleware can be added later
 */
router.get("/myorders", getMyOrders);  // GET logged-in user's orders
router.post("/place", placeOrder);     // POST place new order

export default router;
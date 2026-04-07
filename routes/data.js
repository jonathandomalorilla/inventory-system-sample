import express from 'express';
import { getProducts, getOrders, getInventory } from '../controllers/dataController.js';

const router = express.Router();

/**
 * Data routes for products, orders and inventory.
 */
router.get('/products', getProducts);
router.get('/orders', getOrders);
router.get('/inventory', getInventory);

export default router;

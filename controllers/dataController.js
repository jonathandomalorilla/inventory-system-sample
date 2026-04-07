import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Get products error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch products'
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch orders'
        });
    }
};

export const getInventory = async (req, res) => {
    try {
        const products = await Product.find().sort({ quantity: 1 });
        const lowStock = products.filter((product) => product.quantity <= product.minStockLevel);
        const outOfStock = products.filter((product) => product.quantity === 0);
        const summary = {
            totalProducts: products.length,
            lowStockCount: lowStock.length,
            outOfStockCount: outOfStock.length,
            inStockCount: products.filter((product) => product.quantity > product.minStockLevel).length,
            totalStockQuantity: products.reduce((sum, product) => sum + product.quantity, 0)
        };

        return res.status(200).json({
            success: true,
            summary,
            data: products
        });
    } catch (error) {
        console.error('Get inventory error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch inventory data'
        });
    }
};

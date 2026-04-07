import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

/**
 * Auth Routes
 * POST /api/login - User login
 * POST /api/register - User registration
 */
router.get('/login', (req, res) => {
    return res.status(405).json({
        success: false,
        message: 'Login requires POST. Send credentials to /api/login using a POST request.'
    });
});

router.post('/login', login);
router.get('/register', (req, res) => {
    return res.status(405).json({
        success: false,
        message: 'Registration requires POST. Send user data to /api/register using a POST request.'
    });
});
router.post('/register', register);

export default router;
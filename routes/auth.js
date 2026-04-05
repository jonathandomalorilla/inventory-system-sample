import express from 'express';
// Palitan ang { auth } ng { login } para mag-match sa controller function mo
import { login } from '../controllers/authController.js'; 

const router = express.Router();

// Palitan din dito sa route definition
router.post('/login', login);

export default router;
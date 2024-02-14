import express from 'express'
import { loginController, registerController, updateController } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//user routes
router.post("/register", registerController)
router.post('/login', loginController)
router.put('/update-user', authMiddleware, updateController)


export default router
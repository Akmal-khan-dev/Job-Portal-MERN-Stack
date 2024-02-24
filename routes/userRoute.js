import express from 'express'
import { loginController, registerController, updateController } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { rateLimit } from 'express-rate-limit'

const router = express.Router();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
})

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       required:
 *        -name
 *        -email
 *        -phone
 *        -password
 *        -location
 *     properties:
 *        id:
 *          type: string
 *          description: the auto generated id of user collection
 *        name:
 *          type: string
 *          description: User name
 *        phone:
 *          type: string
 *          description: User phone
 *        email:
 *          type: string
 *          description: user email
 *        password:
 *          type: string
 *          description: user password
 */

//user routes
router.post("/register", limiter, registerController)
router.post('/login',limiter, loginController)
router.put('/update-user', authMiddleware, updateController)


export default router
import express from 'express'
import { addJobController, allJobController, deleteJobController, updateJobController } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create-job', authMiddleware, addJobController)
router.get('/get-jobs', authMiddleware, allJobController)
router.patch('/update-job/:id', authMiddleware, updateJobController)
router.delete('/delete/:id', authMiddleware, deleteJobController)

export default router
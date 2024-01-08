import express, { Router, Request, Response } from 'express';
import userRoutes from './userRoutes'
import jobRoutes from './jobRoutes'
import adminRoutes from './admin'
import authRoutes from './authRoutes'

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

export default router;

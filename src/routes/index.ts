import express, { Router, Request, Response } from 'express';
import userRoutes from './userRoutes'
import jobRoutes from './jobRoutes'

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);

export default router;

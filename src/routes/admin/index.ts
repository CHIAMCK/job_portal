import express, { Router, Request, Response } from 'express';
import adminJobRoutes from './adminJobRoutes'

const router: Router = express.Router();

router.use('/jobs', adminJobRoutes);

export default router;
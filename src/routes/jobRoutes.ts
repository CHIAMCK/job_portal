import express, { Router, Request, Response } from 'express';
import { authorize } from '../middlewares/authorizeMiddleware';
import jobController from '../controllers/jobController';
import { validateApplyJob } from '../middlewares/validationMiddleware';

const router: Router = express.Router();

router.route('/')
    .get(authorize, jobController.listJob)

router.route('/:id')
    .get(authorize, jobController.getJob)

router.route('/apply/:id')
    .post(authorize, validateApplyJob, jobController.applyToJob)

export default router;

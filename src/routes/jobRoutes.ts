import express, { Router, Request, Response } from 'express';
import { validateCreateJob } from '../middlewares/validationMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';
import { roleValidationMiddleware } from '../middlewares/roleValidationMiddleware';
import jobController from '../controllers/jobController';

const router: Router = express.Router();

router.route('/')
    .post(authorize, roleValidationMiddleware(["admin"]), validateCreateJob, jobController.createJob)

router.route('/')
    .get(authorize, roleValidationMiddleware(["admin"]), jobController.listJob)

export default router;

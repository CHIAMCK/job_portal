import express, { Router, Request, Response } from 'express';
import { validateUserCreation } from '../middlewares/validationMiddleware';
import userController from '../controllers/userController';

const router: Router = express.Router();

router.route('/register')
    .post(validateUserCreation, userController.createUser)

export default router;

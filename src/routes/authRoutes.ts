import express, { Router, Request, Response } from 'express';
import { validateUserCreation, validatLogIn } from '../middlewares/validationMiddleware';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.route('/register')
    .post(validateUserCreation, authController.register)

router.route('/login')
    .post(validatLogIn, authController.logIn)

export default router;

import express, { Router, Request, Response } from 'express';
import { validateUserCreation, validatLogIn } from '../middlewares/validationMiddleware';
import userController from '../controllers/userController';

const router: Router = express.Router();

router.route('/register')
    .post(validateUserCreation, userController.createUser)

router.route('/login')
    .post(validatLogIn, userController.logIn)

export default router;

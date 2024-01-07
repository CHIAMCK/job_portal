import express, { Router, Request, Response } from 'express';
import { validateUserCreation, validatLogIn } from '../middlewares/validationMiddleware';
import authController from '../controllers/authController';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations related to user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             password: password123
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       '400':
 *         description: Bad request
 */
router.route('/register')
    .post(validateUserCreation, authController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in as a registered user
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             email: john.doe@example.com
 *             password: password123
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               token: // Your authentication token example
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */
router.route('/login')
    .post(validatLogIn, authController.logIn)

export default router;

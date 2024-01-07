import express, { Router  } from 'express';
import userController from '../controllers/userController';
import { authorize } from '../middlewares/authorizeMiddleware';

const router: Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API operations related to user profiles
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user profile details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []  # Use if you have authentication middleware
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               // Your response body example for user profile details
 *       '401':
 *         description: Unauthorized
 */
router.route('/')
    .get(authorize, userController.viewUserProfileDetails)

export default router;

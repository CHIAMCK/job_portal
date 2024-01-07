import express, { Router, Request, Response } from 'express';
import { authorize } from '../middlewares/authorizeMiddleware';
import jobController from '../controllers/jobController';
import { validateApplyJob } from '../middlewares/validationMiddleware';


const router: Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API operations related to jobs
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get a list of jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: List of jobs
 */
router.route('/')
    .get(authorize, jobController.listJob)

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get details of a specific job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the job
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Details of the job
 */
router.route('/:id')
    .get(authorize, jobController.getJob)

/**
 * @swagger
 * /jobs/apply/{id}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the job
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             resume: // Your resume content here
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Application submitted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.route('/apply/:id')
    .post(authorize, validateApplyJob, jobController.applyToJob)

export default router;

/**
 * @swagger
 * /admin/jobs:
 *   get:
 *     summary: Get a list of jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: The number of items per page
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: List of jobs
 * 
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the job
 *               description:
 *                 type: string
 *                 description: The description of the job
 *               company:
 *                 type: string
 *                 description: The name of the company
 *               salary:
 *                 type: number
 *                 description: The salary for the job
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the job
 *     responses:
 *       '201':
 *         description: Job created successfully
 *       '400':
 *         description: Bad request
 * 
 * /admin/jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Job deleted successfully
 *       '404':
 *         description: Job not found
 */

import express, { Router, Request, Response } from 'express';
import { validateCreateJob } from '../../middlewares/validationMiddleware';
import { authorize } from '../../middlewares/authorizeMiddleware';
import { roleValidationMiddleware } from '../../middlewares/roleValidationMiddleware';
import jobController from '../../controllers/jobController';
import { fileUploadMiddleware } from '../../middlewares/fileUploadMiddleware';

const router: Router = express.Router();

router.route('/')
    .post(authorize, roleValidationMiddleware(["admin"]), fileUploadMiddleware, validateCreateJob, jobController.createJob)

router.route('/')
    .get(authorize, roleValidationMiddleware(["admin"]), jobController.listJob)

router.route('/:id')
    .delete(authorize, roleValidationMiddleware(["admin"]), jobController.deleteJob)

export default router;

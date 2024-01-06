import express, { Router  } from 'express';
import userController from '../controllers/userController';
import { authorize } from '../middlewares/authorizeMiddleware';

const router: Router = express.Router();

router.route('/')
    .get(authorize, userController.viewUserProfileDetails)

export default router;

import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

//get routers

//post routers
authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.login);

export default authRouter;
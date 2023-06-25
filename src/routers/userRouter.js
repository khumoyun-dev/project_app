import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import userController from '../controllers/userController.js';

const userRouter = express.Router();

// userRouter.get('/')
userRouter.get('/', adminMiddleware, userController.getUsers)
userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);
userRouter.put('/:id', authMiddleware, userController.updateUser);

export default userRouter;
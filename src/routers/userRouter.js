import express from 'express';

import userController from '../controllers/UserController.js';

const userRouter = express.Router();

// userRouter.get('/')
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

export default userRouter;
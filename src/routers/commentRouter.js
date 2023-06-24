import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post("/", authMiddleware, commentController.createComment);
commentRouter.get("/", authMiddleware, commentController.getComments);

export default commentRouter;
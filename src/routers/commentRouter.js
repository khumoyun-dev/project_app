import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import commentController from '../controllers/commentController.js';

const commentRouter = express.Router();


commentRouter.get("/", authMiddleware, commentController.getComments);
commentRouter.get("/:commentId", authMiddleware, commentController.getCommentById);
commentRouter.get("/item/:itemId", authMiddleware, commentController.getCommentsByItemId);

commentRouter.post("/", authMiddleware, commentController.createComment);

commentRouter.put("/:commentId", authMiddleware, commentController.updateComment);

commentRouter.delete("/:commentId", authMiddleware, commentController.deleteComment);

export default commentRouter;
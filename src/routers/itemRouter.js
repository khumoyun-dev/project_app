import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import itemController from '../controllers/itemController.js';

const itemRouter = express.Router();

itemRouter.get("/", authMiddleware, itemController.getItems);
itemRouter.post("/", authMiddleware, itemController.createItem);

export default itemRouter;
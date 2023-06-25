import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import itemController from '../controllers/itemController.js';

const itemRouter = express.Router();

itemRouter.get("/", authMiddleware, itemController.getItems);
itemRouter.get("/:itemId", authMiddleware, itemController.getItemById);
itemRouter.get("/collection/:collectionId", authMiddleware, itemController.getItemsByCollectionId);
itemRouter.delete("/:itemId", authMiddleware, itemController.deleteItem);
itemRouter.put("/:itemId", authMiddleware, itemController.updateItem);
itemRouter.post("/", authMiddleware, itemController.createItem);

export default itemRouter;
import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import collectionController from '../controllers/collectionController.js';

const collectionRouter = express.Router();

collectionRouter.get("/", authMiddleware, collectionController.getCollections);
collectionRouter.get("/user/:userId", authMiddleware, collectionController.getCollectionsByUserId);
collectionRouter.get("/:collectionId", authMiddleware, collectionController.getCollectionById);

collectionRouter.put("/:collectionId", authMiddleware, collectionController.updateCollection);

collectionRouter.delete("/:collectionId", authMiddleware, collectionController.deleteCollection);

collectionRouter.post("/", authMiddleware, collectionController.createCollection);

export default collectionRouter;
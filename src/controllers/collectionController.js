import { Collection } from "../modules/postges.js";
import collectionValidation from "../validations/collectionValidation.js";
class collectionController {

    static async createCollection(req, res) {
        try {
            const data = await collectionValidation.validateAsync(req.body);
            const ownerId = req.user;

            const isExist = await Collection.findOne({ where: { title: data.title, ownerId } });
            if (isExist) throw new Error("Collection already exists");

            const collection = await Collection.create({
                ...data,
                ownerId,
            });

            res.status(201).json({
                ok: true,
                data: collection,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getCollections(req, res) {
        try {
            const collections = await Collection.findAll({ order: [['createdAt', 'DESC']] });

            if (collections.length <= 0) throw new Error("No collections found!")

            res.status(200).json({
                ok: true,
                data: collections,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }
    }

    static async getCollectionById(req, res) {
        try {
            const collectionId = req.params.collectionId;
            const collection = await Collection.findOne({ where: { id: collectionId } });
            if (!collection) throw new Error("Collection not found!");

            res.status(200).json({
                ok: true,
                data: collection,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + '',
            });
        }
    }

    static async getCollectionsByUserId(req, res) {
        try {
            const ownerId = req.params.userId;
            const collectionsByUser = await Collection.findAll({ where: { ownerId } }, { order: [['createdAt', 'DESC']] });

            res.status(200).json({
                ok: true,
                data: collectionsByUser,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

}

export default collectionController;
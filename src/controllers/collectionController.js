import Collections from "../models/collectionModel.js";

class collectionController {

    static async getCollections(req, res) {
        try {
            const collections = await Collections.findAll({ order: [['createdAt', 'DESC']] });

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
            const collection = await Collections.findOne({ where: { id: collectionId } });

            res.status(200).json({
                ok: true,
                data: collection
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }
    }

    static async getCollectionsByUserId(req, res) {
        try {
            const ownerId = req.params.userId;
            const collectionsByUser = await Collections.findAll({ where: { ownerId } }, { order: [['createdAt', 'DESC']] });

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

    static async createCollection(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

}

export default collectionController;
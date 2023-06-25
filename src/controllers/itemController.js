import { Item } from "../modules/postges.js";
import itemValidation from "../validations/itemValidation.js"

class itemController {

    static async createItem(req, res) {
        try {
            const data = await itemValidation.validateAsync(req.body);
            const ownerId = req.user;

            const isExist = await Item.findOne({ where: { name: data.name, ownerId } });
            if (isExist) throw new Error("Item already exists!");

            const item = await Item.create({
                ...data,
                ownerId
            });

            res.status(201).json({
                ok: true,
                data: item,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + '',
            })
        }
    }

    static async deleteItem(req, res) {
        try {
            const itemId = req.params.itemId;
            const deletedItem = await Item.destroy({ where: { id: itemId } });
            if (!deletedItem) throw new Error("Item not found!");

            res.status(201).json({
                ok: true,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

    static async updateItem(req, res) {
        try {
            const data = await itemValidation.validateAsync(req.body);
            const itemId = req.params.itemId;
            const updatedItem = await Item.update({ ...data }, { where: { id: itemId }, returning: true });

            res.status(200).json({
                ok: true,
                data: updatedItem,
            });

        }
        catch (error) {
            res.status(400).json({
                ok: false,
                message: error + '',
            })
        }
    }

    static async getItems(req, res) {
        try {
            const items = await Item.findAll({ order: [['createdAt', 'DESC']] });

            res.status(201).json({
                ok: true,
                data: items
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getItemById(req, res) {
        try {
            const itemId = await req.params.itemId;
            const item = await Item.findOne({ where: { id: itemId } });

            if (!item) throw new Error("Item not found!")

            res.status(201).json({
                ok: true,
                data: item
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getItemsByCollectionId(req, res) {
        try {
            const collectionId = req.params.collectionId;
            const items = await Item.findAll({ where: { collectionId } });

            if (items.length <= 0) throw new Error("No items found!");

            res.status(201).json({
                ok: true,
                data: items
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

}

export default itemController;
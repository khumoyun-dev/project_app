import { Item } from "../modules/postges.js";
import itemValidation from "../validations/itemValidation.js"

class itemController {

    static async createItem(req, res) {
        try {
            const data = await itemValidation.validateAsync(req.body);
            const ownerId = req.user;

            const isExist = await Item.findOne({ where: { name: data.name, ownerId } });
            if(isExist) throw new Error("Item already exists!");

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

}

export default itemController;
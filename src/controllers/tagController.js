import { Tag } from "../modules/postges.js";
import tagValidation from "../validations/tagValidation.js";

class tagController {

    static async createTag(req, res) {
        try {
            const data = await tagValidation.validateAsync(req.body);

            const tag = await Tag.create({
                ...data
            });

            res.status(201).json({
                ok: true,
                data: tag,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

}

export default tagController;
import { Comment } from "../modules/postges.js";
import commentValidation from "../validations/commentValidation.js";

class commentController {

    static async createComment(req, res) {
        try {
            const data = await commentValidation.validateAsync(req.body);
            const authorId = req.user;

            const comment = await Comment.create({
                ...data,
                authorId,
            });

            res.status(201).json({
                ok: true,
                data: comment,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getComments(req, res) {
        try {
            const comment = await Comment.findAll({ order: [['createdAt', 'DESC']] });

            res.status(201).json({
                ok: true,
                data: comment,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

}

export default commentController;
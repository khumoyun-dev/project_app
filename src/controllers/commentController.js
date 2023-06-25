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

    static async updateComment(req, res) {
        try {
            const commentId = req.params.commentId;
            const data = await commentValidation.validateAsync(req.body);
            const authorId = req.user;

            const updatedComment = await Comment.update({ ...data }, { where: { id: commentId, authorId } });

            if (!updatedComment) throw new Error("Comment cannot be updated!");

            res.status(201).json({
                ok: true,
                data: updatedComment,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async deleteComment(req, res) {
        try {
            const commentId = req.params.commentId;
            const authorId = req.user;
            const deletedComment = await Comment.destroy({ where: { id: commentId, authorId } });

            if (!deletedComment) throw new Error("Comment not found!");

            res.status(201).json({
                ok: true,
                data: deletedComment,
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getComments(req, res) {
        try {
            const comments = await Comment.findAll({ order: [['createdAt', 'DESC']] });
            if (comments.length <= 0) throw new Error("No comments found!");

            res.status(201).json({
                ok: true,
                data: comments,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async getCommentById(req, res) {
        try {
            const commentId = req.params.commentId;
            const comment = await Comment.findOne({ where: { id: commentId } });
            if (!comment) throw new Error("Comment not found!");

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

    static async getCommentsByItemId(req, res) {
        try {
            const itemId = req.params.itemId;
            const commentsByItem = await Comment.findAll({ where: { itemId } }, { order: [['createdAt', 'DESC']] });

            if (commentsByItem.length <= 0) throw new Error("No comments found");

            res.status(201).json({
                ok: true,
                data: commentsByItem,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

}

export default commentController;
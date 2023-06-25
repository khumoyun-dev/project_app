import { User } from "../modules/postges.js";
import userValidation from '../validations/userValidation.js'

class userController {

    static async getUsers(req, res) {
        try {
            const users = await User.findAll({ order: [["createdAt", "DESC"]], attributes: { exclude: ['password'] } });

            res.status(200).json({
                ok: true,
                data: users
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] }, });
            if (!user) throw new Error("User not found!");

            res.status(200).json({
                ok: true,
                data: user
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            })
        }

    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            // await handleUserDelete(userId);
            const deletedUser = await User.destroy({ where: { id: userId } });
            if (!deletedUser) throw new Error("User not found!");

            res.status(200).json({
                ok: true,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

    static async updateUser(req, res) {
        try {
            const data = await userValidation.validateAsync(req.body);
            const userId = req.params.id;
            const updatedUser = await User.update({ ...data }, { where: { id: userId }, returning: true });
            // if (updatedUser) {
            //     await handleUserUpdate(userId, updatedUser.username, updatedUser.avatar);
            // }

            res.status(200).json({
                ok: true,
                data: updatedUser,
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }
}

export default userController; 
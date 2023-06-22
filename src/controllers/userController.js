import Users from "../models/userModel.js";

class userController {
    static async getUsers(req, res) {
        try {
            const users = await Users.findAll({ order: [["createdAt", "DESC"]] });

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
            const user = await Users.findOne({ where: { id: userId } });

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
            await handleUserDelete(userId);
            const deletedUser = await Users.destroy({ where: { id: userId } });

            res.status(200).json({
                ok: true,
                data: deletedUser,
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
            const userId = req.params.id;
            const updatedUser = await Users.update(req.body, { where: { id: userId } }, { returning: true });
            if (updatedUser) {
                await handleUserUpdate(userId, updatedUser.username, updatedUser.avatar);
            }

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
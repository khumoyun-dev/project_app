import JWT from "../modules/jwt.js";

export default async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const data = JWT.verifyToken(token);
        const userRole = data.role;

        if (userRole !== 'admin') {
            throw new Error('No access, only admins!');
        }

        req.isAdmin = userRole == "admin";

        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: error + ''
        });
    }
}
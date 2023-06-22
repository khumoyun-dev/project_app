import JWT from "../modules/jwt.js";

export default async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new Error('Token not found!');

        const data = JWT.verifyToken(token);

        req.user = data.id;

        next();
    } catch (error) {
        res.status(403).json({
            ok: false,
            message: error + ''
        });
    }
}
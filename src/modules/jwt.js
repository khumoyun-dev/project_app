import JWT from "jsonwebtoken";
import config from "../../config.js";

function generateToken(data) {
    try {
        return JWT.sign(data, config.JWT_SECRET);
    } catch (error) {
        throw new Error(error)
    }
}

function verifyToken(token) {
    try {
        return JWT.verify(token, config.JWT_SECRET);
    } catch (error) {
        throw new Error(error);
    }
}

export default { generateToken, verifyToken }
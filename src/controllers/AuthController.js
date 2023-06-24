import signupValidation from '../validations/signupValidation.js';
import loginValidation from '../validations/loginValidation.js';
import JWT from '../modules/jwt.js';
import bcrypt from '../modules/bcrypt.js';

import { User } from '../modules/postges.js';


class authController {

    static async signUp(req, res) {
        try {
            const data = await signupValidation.validateAsync(req.body);

            const existingUser = await User.findOne({ where: { email: data.email } });
            if (existingUser) throw new Error('User already exists!');

            const user = await User.create({
                username: data.username,
                email: data.email,
                password: await bcrypt.generateHash(data.password),
            });

            const token = JWT.generateToken({
                id: user.id,
                isBlocked: user.isBlocked,
                role: user.role
            });

            res.status(201).json({
                ok: true,
                message: 'Successfully signed up',
                data: { user, token },
            });

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            });
        }
    }

    static async login(req, res) {
        try {
            const data = await loginValidation.validateAsync(req.body);

            const user = await User.findOne({
                where: {
                    email: data.email,
                }
            });

            if (!user) throw new Error('User not found, try to Sign up');

            if (user.isBlocked) throw new Error('You are blocked!');

            let checkPass = await bcrypt.verifyHash(data.password, user.password);
            if (!checkPass) throw new Error('Incorrect password!');

            const token = JWT.generateToken({
                id: user.id,
                isBlocked: user.isBlocked,
                role: user.role
            });

            // res.cookie("token", token, { httpOnly: true });

            res.status(201).json({
                ok: true,
                message: 'Successfully logged in!',
                data: { token },
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }
    }
}

export default authController;
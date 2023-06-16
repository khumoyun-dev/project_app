import SignupValidation from '../validations/SignupValidation';
import LoginValidation from '../validations/LoginValidation';
import JWT from '../modules/jwt';
import bcrypt from '../modules/bcrypt';

async function signUp(req, res) {
    try {
        const data = await SignupValidation.validateAsync(req.body);

        const existingUser = await req.postgres.users.findOne({ where: { email: data.email } });
        if (existingUser) throw new Error('User already exists!');

        const user = await req.postgres.users.create({
            username: data.username,
            email: data.email,
            password: await bcrypt.generateHash(data.password),
        });

        console.log(user);

        res.status(201).json({
            ok: true,
            message: 'Successfully signed up',
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error + ''
        });
    }
}

async function login(req, res) {
    try {
        const data = await LoginValidation.validateAsync(req.body);

        const user = await req.postgres.users.findOne({
            where: {
                email: data.email,
            }
        });

        if (!user) throw new Error('User not found, try to Sign up');

        let checkPass = await bcrypt.verifyHash(data.password, user.password);
        if (!checkPass) throw new Error('Incorrect password!');

    } catch (error) {

    }
}
import Joi from "joi";

export default Joi.object({
    username: Joi.string()
        .max(32)
        .min(3)
        .required()
        .error(Error('Invalid username')),
    email: Joi.string()
        .email()
        .required()
        .error(Error('Invalid email')),
})
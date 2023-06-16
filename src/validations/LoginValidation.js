import Joi from "joi";

export default Joi.object({
    email: Joi.email()
        .required()
        .error(Error('Invalid email')),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
        .required()
        .error(Error('Invalid password')),
}); 
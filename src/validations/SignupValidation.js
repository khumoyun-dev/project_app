import Joi from 'joi';

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
       password: Joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
              .required()
              .error(Error('Invalid password')),
});
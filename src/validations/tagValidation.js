import Joi from 'joi';

export default Joi.object({
    label: Joi.string().required(),
    itemId: Joi.string().uuid().required(),
});
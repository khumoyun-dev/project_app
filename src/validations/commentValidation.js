import Joi from "joi";

export default Joi.object({
    text: Joi.string().required(),
    itemId: Joi.string().uuid(),
});
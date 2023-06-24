import Joi from "joi";

export default Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    collectionId: Joi.string().uuid(),
});
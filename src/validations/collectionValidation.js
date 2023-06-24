import Joi from "joi";

export default Joi.object({
    title: Joi.string()
        .required(),
    description: Joi.string(),
    theme: Joi.string()
            .required(),
    image: Joi.string()
            .optional(),
});
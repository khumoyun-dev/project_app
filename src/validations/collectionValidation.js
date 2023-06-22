import Joi from "joi";

export default Joi.object({
    title: Joi.string()
        .required(),
    description: Joi.string()
            .required(),
    theme: Joi.string()
            .required(),
    image: Joi.string()
});
const Joi = require('joi');


// Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(data.body);
}
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(data.body);
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation

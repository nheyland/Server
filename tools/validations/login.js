const Joi = require("joi");

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().label("Email!"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data.body);
};
module.exports.loginValidation = loginValidation;

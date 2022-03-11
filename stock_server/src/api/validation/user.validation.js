const { Joi } = require('express-validation')

const loginValidation = {
  body: Joi.object({
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    username: Joi.string()
      .required()
  })
}

const signupValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    username: Joi.string()
      .required()
  })
}

module.exports = {
  loginValidation,
  signupValidation
}

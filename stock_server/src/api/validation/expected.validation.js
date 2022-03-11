const { Joi } = require('express-validation')

const createExpectedValidation = {
  body: Joi.object({
    value: Joi.number().required()
  })
}

const updateExpectedValidation = {
  body: Joi.object({
    value: Joi.number().required()
  })
}

module.exports = {
  createExpectedValidation,
  updateExpectedValidation
}

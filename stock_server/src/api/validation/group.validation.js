const { Joi } = require('express-validation')

const createGroupValidation = {
  body: Joi.object({
    groupName: Joi.string().required()
  })
}
module.exports = {
  createGroupValidation
}

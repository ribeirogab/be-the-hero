const { celebrate, Segments, Joi } = require('celebrate')

function store () {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  })
}

module.exports = { store }

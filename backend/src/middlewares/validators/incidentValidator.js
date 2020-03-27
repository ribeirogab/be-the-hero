const { celebrate, Segments, Joi } = require('celebrate')

function index () {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  })
}

module.exports = { index }

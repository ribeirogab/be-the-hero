const knex = require('knex')
const config = require('../../knexfile')

const knexConfig = process.env.NODE_ENV === 'test' ? config.test : config.development

const connection = knex(knexConfig)

module.exports = connection

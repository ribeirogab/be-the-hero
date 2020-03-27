module.exports = require('dotenv').config({ path: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ? '.env.dev' : '.env' })
